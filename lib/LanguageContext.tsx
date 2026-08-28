'use client';

import { createContext, useContext, useCallback, useSyncExternalStore, ReactNode } from 'react';

export type Lang = 'en' | 'fr';

const STORAGE_KEY = 'uottarun_lang';

interface LangContextValue {
  lang: Lang;
  changeLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue>({ lang: 'en', changeLang: () => {} });

const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

function getSnapshot(): Lang {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === 'en' || saved === 'fr' ? saved : 'en';
}

function getServerSnapshot(): Lang {
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const changeLang = useCallback((l: Lang) => {
    localStorage.setItem(STORAGE_KEY, l);
    listeners.forEach((onStoreChange) => onStoreChange());
  }, []);

  return <LangContext.Provider value={{ lang, changeLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
