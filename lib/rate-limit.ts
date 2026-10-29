export type RateLimitOptions = {
  readonly limit: number;
  readonly windowMs: number;
  readonly maxTrackedKeys?: number;
};

export type RateLimitVerdict = {
  readonly isAllowed: boolean;
  readonly retryAfterSeconds: number;
};

type Window = {
  count: number;
  expiresAt: number;
};

const DEFAULT_MAX_TRACKED_KEYS = 10_000;

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
