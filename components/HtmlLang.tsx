'use client';

import { useEffect } from 'react';
import { useLang } from '../lib/LanguageContext';

/**
 * Keeps <html lang> in step with the language switch.
 *
 * The attribute is server-rendered as "en" and the switch is client-side, so
 * without this it silently lies to screen readers — and to search engines —
 * for every visitor reading the site in French.
 */
export function HtmlLang() {
  const { lang } = useLang();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
