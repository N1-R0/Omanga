/**
 * The strings the language switcher needs.
 *
 * They are in English and stay in English, because they are read by someone who
 * has not yet chosen another language — and because there is no approved copy
 * in any other language to put here. `config/locales.ts` explains why.
 *
 * `pendingNote` is the one string that would normally be a placeholder and is
 * not: it states a fact about the site rather than standing in for copy that is
 * missing.
 */
export const languageContent: {
  readonly triggerLabel: string;
  readonly menuLabel: string;
  readonly currentSuffix: string;
  readonly pendingNote: string;
} = {
  /** The button's accessible name. The language's own name is appended. */
  triggerLabel: "Change language",
  /** Names the list inside the panel. */
  menuLabel: "Available languages",
  /** Appended to the selected row, for screen readers only. */
  currentSuffix: "current language",
  /** Shown beside a language whose content has not been translated yet. */
  pendingNote: "Coming soon",
} as const;
