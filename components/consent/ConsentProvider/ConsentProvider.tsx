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

export type ConsentContextValue = {
  readonly isReady: boolean;
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

let cachedRecord: ConsentRecord | null = null;
let hasReadStorage = false;

function getRecordSnapshot(): ConsentRecord | null {
  if (!hasReadStorage) {
    cachedRecord = readConsent();
    hasReadStorage = true;
  }

  return cachedRecord;
}

function getServerRecordSnapshot(): ConsentRecord | null {
  return null;
}

function subscribeToRecord(onChange: () => void): () => void {
  const handle = () => {
    hasReadStorage = false;
    onChange();
  };

  const handleStorage = (event: StorageEvent) => {
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

const NO_OP_SUBSCRIBE = () => () => {};
const getIsHydrated = () => true;
const getIsHydratedOnServer = () => false;

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

export function useConsent(): ConsentContextValue {
  const value = useContext(ConsentContext);

  if (value === null) {
    throw new Error("useConsent must be used within a ConsentProvider.");
  }

  return value;
}
