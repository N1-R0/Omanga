/**
 * A fixed-window rate limiter held in process memory.
 *
 * project-context.md rules out a database for this phase, so there is nowhere
 * durable to count requests. This is the honest version of that constraint: one
 * `Map`, one process, no persistence and no claim to be more than that.
 *
 * ---------------------------------------------------------------------------
 * What it does and does not stop
 *
 * It stops the case that actually happens to a public contact form — one script
 * posting the same endpoint in a loop from one address — and it costs nothing.
 *
 * It does not survive a restart, and it is not shared between instances: on a
 * serverless platform each concurrent instance keeps its own counter, so the
 * effective limit is the configured limit multiplied by however many instances
 * are warm. A distributed attacker spreading across addresses walks through it
 * untouched.
 *
 * [GAP] Closing either of those means shared state — Redis, Upstash, or the
 * platform's own edge rate limiting — which is a dependency and an operational
 * decision, not a code one. Raised rather than taken. The honeypot in
 * `lib/enquiry.ts` is the layer that catches what this one misses, and the two
 * are deliberately different in kind.
 *
 * ---------------------------------------------------------------------------
 * Fixed window rather than sliding window or token bucket. A sliding window
 * needs a timestamp list per key and a token bucket needs a refill clock; both
 * are more state to hold and more to get wrong, and the difference only shows at
 * a window boundary, where the worst case is a caller getting two windows' worth
 * of requests in quick succession. For a form that allows a handful of
 * submissions an hour, that is not a failure mode worth code.
 */

export type RateLimitOptions = {
  /** Requests permitted per key, per window. */
  readonly limit: number;
  /** Window length in milliseconds. */
  readonly windowMs: number;
  /**
   * Hard cap on tracked keys, after which expired entries are swept and, if
   * that frees nothing, the request is allowed rather than blocked.
   *
   * Without it the map grows once per unique address seen and never shrinks,
   * which turns a rate limiter into the memory leak it was added to prevent.
   */
  readonly maxTrackedKeys?: number;
};

export type RateLimitVerdict = {
  readonly isAllowed: boolean;
  /** Whole seconds until the current window ends. Suitable for `Retry-After`. */
  readonly retryAfterSeconds: number;
};

type Window = {
  count: number;
  /** Epoch milliseconds at which this window ends. */
  expiresAt: number;
};

const DEFAULT_MAX_TRACKED_KEYS = 10_000;

/**
 * Builds a limiter. Each call owns its own state, so two limiters with
 * different rules cannot interfere — and a caller cannot accidentally share a
 * counter between two endpoints by importing the same singleton.
 */
export function createRateLimiter({
  limit,
  windowMs,
  maxTrackedKeys = DEFAULT_MAX_TRACKED_KEYS,
}: RateLimitOptions): (key: string) => RateLimitVerdict {
  const windows = new Map<string, Window>();

  const sweepExpired = (now: number): void => {
    for (const [key, window] of windows) {
      if (window.expiresAt <= now) {
        windows.delete(key);
      }
    }
  };

  return function check(key: string): RateLimitVerdict {
    const now = Date.now();
    const existing = windows.get(key);

    if (existing === undefined || existing.expiresAt <= now) {
      if (windows.size >= maxTrackedKeys) {
        sweepExpired(now);
      }

      /*
        Still full after the sweep. Failing open is deliberate: at this point the
        limiter has lost the ability to tell a flood from a busy hour, and a
        limiter that starts refusing legitimate enquiries is worse than one that
        stops working. The condition is worth knowing about, so it is logged.
      */
      if (windows.size >= maxTrackedKeys) {
        console.warn("[rate-limit] tracking table full, allowing request", {
          maxTrackedKeys,
        });

        return { isAllowed: true, retryAfterSeconds: 0 };
      }

      windows.set(key, { count: 1, expiresAt: now + windowMs });

      return { isAllowed: true, retryAfterSeconds: 0 };
    }

    const retryAfterSeconds = Math.ceil((existing.expiresAt - now) / 1000);

    if (existing.count >= limit) {
      return { isAllowed: false, retryAfterSeconds };
    }

    existing.count += 1;

    return { isAllowed: true, retryAfterSeconds: 0 };
  };
}
