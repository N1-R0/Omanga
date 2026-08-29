/**
 * Cookie and storage consent — the state, its storage, and its rules.
 *
 * This module is the single owner of what "consent" means on omanga.biz. The UI
 * in `components/consent/` reads and writes through it and holds no rules of its
 * own, so there is exactly one definition of which categories exist, which one
 * cannot be refused, and what a stored record has to look like to be trusted.
 *
 * ---------------------------------------------------------------------------
 * WHAT THIS ACTUALLY GATES TODAY
 *
 * Two things, and it is worth being precise because the honest answer is short:
 *
 *   analytics    Vercel Speed Insights. Audited: it sets no cookie and writes
 *                nothing to browser storage (`@vercel/speed-insights` contains
 *                no reference to `document.cookie`, `localStorage` or
 *                `sessionStorage`). It beacons Core Web Vitals to
 *                `/_vercel/speed-insights/vitals`, and the request carries an IP
 *                address the way every HTTP request does.
 *
 *                Because it stores nothing on the device, the ePrivacy consent
 *                rule for terminal-equipment access is not what makes it
 *                consentable — the processing is. Gating it is the cautious
 *                reading and costs nothing, so it is gated.
 *
 *   functional   The Google Maps embed on /contact. An iframe to
 *                `maps.google.com` is a third-party request that lets Google set
 *                and read its own cookies in its own context, which this site
 *                cannot see, control or delete. That is a genuine consent
 *                requirement, and the frame is not requested until the category
 *                is granted.
 *
 * `marketing` is declared and always enforced, but nothing on the site currently
 * belongs to it. It exists so that adding a pixel is a one-line registration
 * against an already-working gate rather than a retrofit — and so the Cookie
 * Policy can state truthfully that the control exists. It must never be quietly
 * repurposed: a category the visitor refused is a promise, not a label.
 *
 * ---------------------------------------------------------------------------
 * WHY `localStorage` AND NOT A COOKIE
 *
 * The record is read only by client code, to decide whether to mount a script.
 * A cookie would be transmitted to the server on every single request — more
 * data crossing the network, in more logs, for a value the server never reads.
 * `localStorage` keeps the decision on the device that made it.
 *
 * Storing the choice is itself strictly necessary: remembering that someone said
 * "no" is the mechanism by which "no" is honoured, so it needs no consent. It
 * holds four booleans, a version and a timestamp — no identifier, no address, no
 * fingerprint, nothing that could identify the person who set it.
 *
 * The trade-off, recorded because it is real: `localStorage` is per-origin and
 * per-browser, so a visitor who clears site data or switches browser is asked
 * again. That is the correct failure direction — it re-asks rather than assuming.
 */

/* -----------------------------------------------------------------------------
   Categories
   -------------------------------------------------------------------------- */

export const CONSENT_CATEGORIES = [
  "necessary",
  "functional",
  "analytics",
  "marketing",
] as const;

export type ConsentCategory = (typeof CONSENT_CATEGORIES)[number];

/**
 * The category that cannot be refused, named once.
 *
 * Nothing in this category is a tracker. It covers the request the page itself
 * makes and the record of the visitor's own consent choice — refusing it would
 * mean refusing to remember the refusal.
 */
export const NECESSARY_CATEGORY: ConsentCategory = "necessary";

/** The categories a visitor can actually decide about. */
export const OPTIONAL_CATEGORIES: readonly ConsentCategory[] =
  CONSENT_CATEGORIES.filter((category) => category !== NECESSARY_CATEGORY);

export type ConsentDecisions = Readonly<Record<ConsentCategory, boolean>>;

/* -----------------------------------------------------------------------------
   The stored record
   -------------------------------------------------------------------------- */

/**
 * Bumped whenever the *meaning* of a stored decision changes — a new category,
 * a new vendor inside an existing category, or a material change to what a
 * category covers. A record from an older version is discarded rather than
 * migrated, and the banner is shown again.
 *
 * Discarding is deliberate. A consent record is evidence of what someone was
 * told when they agreed; carrying it forward across a change to what they were
 * told turns it into a claim about a conversation that never happened. Re-asking
 * costs one banner.
 *
 * Not to be bumped for copy edits, styling, or adding a page.
 */
export const CONSENT_VERSION = 1;

export const CONSENT_STORAGE_KEY = "omanga.consent" as const;

/**
 * Broadcast on the window when consent changes, so components mounted anywhere
 * in the tree react without the provider having to know they exist.
 *
 * `storage` events are not enough on their own: the browser fires them in *other*
 * tabs and never in the tab that made the write. This event covers the writing
 * tab; the `storage` listener in the provider covers the rest, which is what
 * makes a decision in one tab take effect in another.
 */
export const CONSENT_EVENT = "omanga:consent-change" as const;

export type ConsentRecord = {
  readonly version: number;
  /** ISO 8601, UTC. When the decision was made. */
  readonly timestamp: string;
  readonly decisions: ConsentDecisions;
};

/* -----------------------------------------------------------------------------
   Presets
   -------------------------------------------------------------------------- */

/**
 * What is true before anyone has decided, and what a rejection means.
 *
 * Both are the same object, and that is the point: until there is a stored
 * record, the site behaves exactly as if everything optional had been refused.
 * There is no window in which a script runs on the strength of not having been
 * told no.
 */
export const DENIED_DECISIONS: ConsentDecisions = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
} as const;

export const GRANTED_DECISIONS: ConsentDecisions = {
  necessary: true,
  functional: true,
  analytics: true,
  marketing: true,
} as const;

/**
 * Forces `necessary` true regardless of what was passed.
 *
 * Applied on every write and on every read. A record that arrived with
 * `necessary: false` — hand-edited, or written by an older build — is corrected
 * rather than honoured, because the category describes storage the site cannot
 * function without.
 */
export function normaliseDecisions(
  decisions: ConsentDecisions,
): ConsentDecisions {
  return { ...decisions, [NECESSARY_CATEGORY]: true };
}

/* -----------------------------------------------------------------------------
   Reading and writing
   -------------------------------------------------------------------------- */

function isConsentDecisions(value: unknown): value is ConsentDecisions {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return CONSENT_CATEGORIES.every(
    (category) => typeof candidate[category] === "boolean",
  );
}

/**
 * Reads the stored record, or `null` if there is nothing trustworthy to read.
 *
 * Every failure path returns `null`, which the rest of the system treats as
 * "not yet decided" and therefore as `DENIED_DECISIONS`. Absent, unparseable,
 * wrong-shaped, and stale-versioned all land in the same safe place, so a
 * corrupted value can never be read as permission.
 *
 * The `try` is not decoration. `localStorage` *throws* on access in Safari's
 * private mode and wherever a browser is configured to block site data — not
 * returning null, throwing on the property read itself. Uncaught, that is a
 * render crash on first paint for those visitors.
 */
export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);

    if (raw === null) {
      return null;
    }

    const parsed: unknown = JSON.parse(raw);

    if (typeof parsed !== "object" || parsed === null) {
      return null;
    }

    const candidate = parsed as Record<string, unknown>;

    if (candidate.version !== CONSENT_VERSION) {
      return null;
    }

    if (
      typeof candidate.timestamp !== "string" ||
      !isConsentDecisions(candidate.decisions)
    ) {
      return null;
    }

    return {
      version: CONSENT_VERSION,
      timestamp: candidate.timestamp,
      decisions: normaliseDecisions(candidate.decisions),
    };
  } catch {
    return null;
  }
}

/**
 * Persists a decision and returns the record that was written.
 *
 * The record is returned even when the write failed, so a visitor with storage
 * blocked still gets their choice honoured for the life of the page rather than
 * being handed a banner that does nothing when pressed. The choice is simply not
 * remembered for next time, which is the only part storage was responsible for.
 */
export function writeConsent(decisions: ConsentDecisions): ConsentRecord {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    decisions: normaliseDecisions(decisions),
  };

  if (typeof window === "undefined") {
    return record;
  }

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Private mode, blocked site data, or a full quota. Nothing to recover and
    // nothing worth telling the visitor: the decision still applies to this page.
  }

  return record;
}

/**
 * Deletes the stored record, returning the visitor to the pre-decision state.
 *
 * Exposed so "withdraw consent" can be exactly as easy as giving it, which is
 * what the Cookie Policy tells visitors and what makes the claim true.
 */
export function clearConsent(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // See `writeConsent`.
  }
}
