/**
 * The languages the site offers, and the one fact about each that decides
 * whether it can be selected yet.
 *
 * ---------------------------------------------------------------------------
 * WHY EVERY LOCALE BUT ENGLISH IS MARKED UNAVAILABLE
 *
 * `isAvailable` is not a feature flag waiting to be switched on for effect. It
 * records something true: no translated copy exists in this project. Every
 * user-facing string on this site lives in a typed content module traceable to
 * the approved copy document, and there is no approved copy in Spanish,
 * Kiswahili, Hausa or Yorùbá.
 *
 * Machine-translating them was not done, and should not be. This site sells
 * health insurance and publishes a privacy policy, a complaints procedure and
 * two sets of terms — documents where a mistranslated clause is a
 * misrepresentation of what a customer is buying, not a typo. The project's own
 * rule covers it: unverified content renders nothing rather than invented data.
 *
 * So the switcher shows the full set, because the information architecture is
 * real and reviewable, and marks four of them as not yet available. Turning one
 * on is a one-word change here once its content modules exist.
 *
 * ---------------------------------------------------------------------------
 * ON THE FLAGS
 *
 * Flags mark countries, not languages, and every entry below is a compromise
 * that should be understood rather than inherited. The rule applied, on
 * instruction, is "the country with the most speakers":
 *
 *   English     United Kingdom, not the United States, which has roughly four
 *               times as many speakers. The exception to the rule, kept because
 *               the Union flag is the conventional marker for the language and
 *               because the alternative reading of "most speakers" in this
 *               site's own market is Nigeria — which would then appear three
 *               times in one menu.
 *   Español     Mexico, not Spain. Mexico has around 130 million speakers to
 *               Spain's 47 million, so the rule points away from the flag most
 *               language menus reach for.
 *   Kiswahili   Tanzania, where it is the national language and has the largest
 *               body of speakers. Kenya, Uganda and the DRC all have strong
 *               claims.
 *   Hausa       Nigeria, ahead of Niger.
 *   Yorùbá      Nigeria, ahead of Benin and Togo.
 *
 * Hausa and Yorùbá therefore carry the same flag. That is unavoidable and is why
 * the flag is never the label: every row prints the language's own name beside
 * it, and the name is what the accessible name is built from. The flag is
 * decorative and marked as such.
 */

export type LocaleCode = "en" | "es" | "sw" | "ha" | "yo";

export type Locale = {
  readonly code: LocaleCode;
  /** The language's name in itself. What the row actually says. */
  readonly nativeName: string;
  /** The same language in English, for accessible names and `hreflang` notes. */
  readonly englishName: string;
  /** Path to the flag asset in `public/flags`. Decorative — see above. */
  readonly flag: string;
  /** Whether translated content modules exist for this locale. */
  readonly isAvailable: boolean;
};

/**
 * [CHANGED, 2026-08-29] English only, on instruction.
 *
 * The four other languages were listed here marked unavailable and rendered as
 * "Coming soon" rows. They are removed rather than hidden: a menu of one live
 * option and four dead ones advertises a roadmap on the live site, and the flag
 * now reads as a statement of what language this site is in.
 *
 * The intended set and the reasoning for each flag are kept in the block above,
 * and the assets stay in `public/flags` — `mexico.svg` and `tanzania.svg` were
 * added for this and are otherwise unused. Restoring a language is one entry
 * here plus its content modules; nothing else in the switcher needs to change,
 * because it already renders whatever this array contains.
 */
export const LOCALES: readonly Locale[] = [
  {
    code: "en",
    nativeName: "English",
    englishName: "English",
    flag: "/flags/united-kingdom.svg",
    isAvailable: true,
  },
] as const;

/**
 * The language the site is written in, and the fallback for every other.
 *
 * It is also the `lang` attribute on `<html>` until a translated locale ships.
 * Declaring `lang="sw"` on a page of English prose would be worse than
 * declaring nothing: a screen reader would switch to a Kiswahili voice and read
 * English text with it.
 */
export const DEFAULT_LOCALE: LocaleCode = "en";

/**
 * Where the visitor's choice is kept.
 *
 * A cookie rather than `localStorage` so the preference is readable on the
 * server when locale routing lands, and prefixed like every other cookie this
 * site sets.
 */
export const LOCALE_COOKIE = "omanga_locale";

/** A year. Long enough that a returning visitor is not asked twice. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function findLocale(code: string): Locale | undefined {
  return LOCALES.find((locale) => locale.code === code);
}
