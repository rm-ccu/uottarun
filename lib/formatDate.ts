import type { Lang } from './LanguageContext';

const LOCALES: Record<Lang, string> = { en: 'en-CA', fr: 'fr-CA' };

/**
 * Short month for a YYYY-MM-DD string, in the reader's language.
 *
 * Formatted at render time rather than on the server because the language is a
 * client-side choice — a server-computed month would always be English. French
 * abbreviations carry a trailing period ("janv.") that reads badly uppercased
 * in a date badge, so it is stripped.
 */
export function monthAbbr(iso: string, lang: Lang): string {
  return new Date(`${iso}T00:00:00`)
    .toLocaleString(LOCALES[lang], { month: 'short' })
    .replace('.', '')
    .toUpperCase();
}

/** Day number for a YYYY-MM-DD string, parsed as local time. */
export function dayOfMonth(iso: string): number {
  return new Date(`${iso}T00:00:00`).getDate();
}
