export type Locale = 'cs' | 'en';

export const LOCALES: readonly Locale[] = ['cs', 'en'] as const;

/** Czech is served at bare paths (Option A) and is the x-default locale. */
export const DEFAULT_LOCALE: Locale = 'cs';

/** localStorage key for the first-visit language hint (URL stays the source of truth). */
export const LANG_STORAGE_KEY = 'revai-lang';

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
