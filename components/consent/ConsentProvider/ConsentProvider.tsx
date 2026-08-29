"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";

import {
  CONSENT_EVENT,
  CONSENT_STORAGE_KEY,
  DENIED_DECISIONS,
  GRANTED_DECISIONS,
  clearConsent,
  readConsent,
  writeConsent,
} from "@/lib/consent";
import type {
  ConsentCategory,
  ConsentDecisions,
  ConsentRecord,
} from "@/lib/consent";

/**
 * Holds the visitor's consent decision for the document and hands it to whoever
 * asks.
 *
 * ---------------------------------------------------------------------------
 * THE HYDRATION RULE, WHICH IS ALSO THE ENFORCEMENT RULE
 *
 * `localStorage` does not exist during server rendering, so the record cannot be
 * read until the component has mounted in the browser. That produces one render
 * pass in which the answer is genuinely unknown, and the whole correctness of
 * this system rests on what happens during it.
 *
 * `isReady` is that pass, exposed rather than hidden. Until it is true:
 *
 *   - `hasConsent` returns false for every optional category, so nothing gated
 *     mounts. An unknown answer is treated as a refusal, never as permission.
 *   - The banner renders nothing, so it cannot flash on screen for a visitor who
 *     decided months ago.
 *
 * Reading during render instead — or seeding state from `localStorage` in a
 * `useState` initialiser — makes the server and client HTML disagree and React
 * discards the client tree. It also, more importantly, would put a script on the
 * page for the length of a render before the refusal was known. One render pass
 * of no analytics is free; one render pass of unconsented analytics is the exact
 * failure this component exists to prevent.
 *
 * ---------------------------------------------------------------------------
 * MULTIPLE TABS
 *
 * The `storage` event fires in every *other* tab on the origin and never in the
 * one that wrote. `CONSENT_EVENT` covers the writing tab. Both are listened to,
 * so a visitor who rejects analytics in one tab has it stop in the others
 * without reloading them.
 */

export type ConsentContextValue = {
  /** False until the stored record has been read in the browser. */
  readonly isReady: boolean;
  /** The stored decision, or `null` when nothing has been decided yet. */
  readonly record: ConsentRecord | null;
  readonly decisions: ConsentDecisions;
  readonly hasConsent: (category: ConsentCategory) => boolean;
  readonly acceptAll: () => void;
  readonly rejectAll: () => void;
  readonly save: (decisions: ConsentDecisions) => void;
  readonly reopen: () => void;
  readonly isPreferencesOpen: boolean;
  readonly openPreferences: () => void;
  readonly closePreferences: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

/* -----------------------------------------------------------------------------
   The external store
   -------------------------------------------------------------------------- */

/**
 * `localStorage` is an external store, so it is read through
 * `useSyncExternalStore` rather than copied into state by an effect.
 *
 * The effect version — read on mount, `setState`, subscribe — works, and it is
 * what this component did first. This is better for three specific reasons:
 *
 *   no cascading render   `setState` in a mount effect renders twice on every
 *                         page load, for every visitor. React's
 *                         `react-hooks/set-state-in-effect` rule flags exactly
 *                         this, and it is right to.
 *   tear-free             React re-reads the snapshot before committing, so two
 *                         components can never render from different consent
 *                         states within one paint. With the effect version, a
 *                         change arriving mid-render could do that.
 *   hydration is explicit `getServerSnapshot` states what the server knows,
 *                         which is nothing, instead of encoding it as an initial
 *                         `useState(null)` that happens to be right.
 *
 * The snapshot must be referentially stable between changes or React re-renders
 * forever, so the parsed record is cached and re-read only when a change is
 * announced.
 */
let cachedRecord: ConsentRecord | null = null;
let hasReadStorage = false;

function getRecordSnapshot(): ConsentRecord | null {
  if (!hasReadStorage) {
    cachedRecord = readConsent();
    hasReadStorage = true;
  }

  return cachedRecord;
}

/**
 * The server, and the client during hydration, know nothing.
 *
 * Returning `null` here is what guarantees the server HTML and the first client
 * render agree — and, because `null` means "no consent", it is also what
 * guarantees nothing gated can appear in prerendered HTML.
 */
function getServerRecordSnapshot(): ConsentRecord | null {
  return null;
}

function subscribeToRecord(onChange: () => void): () => void {
  const handle = () => {
    hasReadStorage = false;
    onChange();
  };

  const handleStorage = (event: StorageEvent) => {
    /*
      `key` is null when the whole store is cleared, which is a change to this
      record as much as a targeted write is — so both are re-read.
    */
    if (event.key === null || event.key === CONSENT_STORAGE_KEY) {
      handle();
    }
  };

  window.addEventListener(CONSENT_EVENT, handle);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(CONSENT_EVENT, handle);
    window.removeEventListener("storage", handleStorage);
  };
}

/**
 * False on the server and during hydration, true once mounted on the client.
 *
 * The same mechanism as above, used for the one bit of information that has no
 * external store behind it. It replaces a `useState(false)` plus a mount effect,
 * and it is the reason no gated component and no banner can appear in the
 * prerendered HTML: both are told the answer is not yet known.
 */
const NO_OP_SUBSCRIBE = () => () => {};
const getIsHydrated = () => true;
const getIsHydratedOnServer = () => false;

/* -----------------------------------------------------------------------------
   The provider
   -------------------------------------------------------------------------- */

export type ConsentProviderProps = {
  children: ReactNode;
};

export function ConsentProvider({ children }: ConsentProviderProps) {
  const isReady = useSyncExternalStore(
    NO_OP_SUBSCRIBE,
    getIsHydrated,
    getIsHydratedOnServer,
  );

  const record = useSyncExternalStore(
    subscribeToRecord,
    getRecordSnapshot,
    getServerRecordSnapshot,
  );

  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  /**
   * Writes, then announces. The event is what refreshes the snapshot in this tab;
   * the browser's own `storage` event covers the others.
   */
  const commit = useCallback((decisions: ConsentDecisions) => {
    writeConsent(decisions);
    setIsPreferencesOpen(false);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }, []);

  const acceptAll = useCallback(() => {
    commit(GRANTED_DECISIONS);
  }, [commit]);

  const rejectAll = useCallback(() => {
    commit(DENIED_DECISIONS);
  }, [commit]);

  /**
   * Returns the visitor to the undecided state and reopens the banner.
   *
   * The stored record is deleted rather than overwritten with a rejection: a
   * visitor withdrawing consent is asking to be un-decided, and leaving a
   * rejection behind would silently suppress the banner they just asked to see.
   */
  const reopen = useCallback(() => {
    clearConsent();
    setIsPreferencesOpen(true);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }, []);

  const decisions = record?.decisions ?? DENIED_DECISIONS;

  const hasConsent = useCallback(
    (category: ConsentCategory) => isReady && decisions[category],
    [isReady, decisions],
  );

  const value = useMemo<ConsentContextValue>(
    () => ({
      isReady,
      record,
      decisions,
      hasConsent,
      acceptAll,
      rejectAll,
      save: commit,
      reopen,
      isPreferencesOpen,
      openPreferences: () => {
        setIsPreferencesOpen(true);
      },
      closePreferences: () => {
        setIsPreferencesOpen(false);
      },
    }),
    [
      isReady,
      record,
      decisions,
      hasConsent,
      acceptAll,
      rejectAll,
      commit,
      reopen,
      isPreferencesOpen,
    ],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

/**
 * Throws when used outside the provider rather than returning a default.
 *
 * A permissive default here would be a silent consent bypass: a gated component
 * accidentally mounted outside the tree would read "no decision" and, depending
 * on how that default was written, could run. Failing at the first render in
 * development is the only outcome that cannot ship.
 */
export function useConsent(): ConsentContextValue {
  const value = useContext(ConsentContext);

  if (value === null) {
    throw new Error("useConsent must be used within a ConsentProvider.");
  }

  return value;
}
