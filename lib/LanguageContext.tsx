'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type Lang = 'en' | 'fr';

const STORAGE_KEY = 'uottarun_lang';

interface LangContextValue {
  lang: Lang;
  changeLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue>({ lang: 'en', changeLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'fr') setLang(saved);
  }, []);

  const changeLang = useCallback((l: Lang) => {
    setLang(l);
    localStorage.setItem(STORAGE_KEY, l);
  }, []);

  return <LangContext.Provider value={{ lang, changeLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
