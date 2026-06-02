import { useLang, type Lang } from './LanguageContext';
import enCommon from '../locales/en/common.json';
import frCommon from '../locales/fr/common.json';

const resources: Record<Lang, Record<string, unknown>> = {
  en: enCommon as Record<string, unknown>,
  fr: frCommon as Record<string, unknown>,
};

function resolve(dict: Record<string, unknown>, key: string): string {
  const val = key.split('.').reduce<unknown>(
    (o, k) => (typeof o === 'object' && o !== null ? (o as Record<string, unknown>)[k] : undefined),
    dict
  );
  return typeof val === 'string' ? val : key;
}

export function useTranslation() {
  const { lang, changeLang } = useLang();
  const t = (key: string): string => resolve(resources[lang], key);
  return { t, lang, changeLang };
}
