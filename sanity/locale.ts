export type Lang = 'en' | 'fr';

export type LocaleString = { en: string; fr?: string } | null | undefined;

/** French falls back to English so a missing translation degrades to readable
 *  content rather than a blank space. */
export const loc = (value: LocaleString, lang: Lang): string =>
  !value ? '' : lang === 'fr' ? value.fr || value.en : value.en;
