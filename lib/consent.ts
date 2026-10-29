export const CONSENT_CATEGORIES = [
  "necessary",
  "functional",
  "analytics",
  "marketing",
] as const;

export type ConsentCategory = (typeof CONSENT_CATEGORIES)[number];

export const NECESSARY_CATEGORY: ConsentCategory = "necessary";

export type ConsentDecisions = Readonly<Record<ConsentCategory, boolean>>;

export const CONSENT_VERSION = 2;

export const CONSENT_STORAGE_KEY = "omanga.consent" as const;

export const CONSENT_EVENT = "omanga:consent-change" as const;

export type ConsentRecord = {
  readonly version: number;
  readonly timestamp: string;
  readonly decisions: ConsentDecisions;
};

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

function normaliseDecisions(
  decisions: ConsentDecisions,
): ConsentDecisions {
  return { ...decisions, [NECESSARY_CATEGORY]: true };
}

function isConsentDecisions(value: unknown): value is ConsentDecisions {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return CONSENT_CATEGORIES.every(
    (category) => typeof candidate[category] === "boolean",
  );
}

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
  }

  return record;
}

export function clearConsent(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
  }
}
