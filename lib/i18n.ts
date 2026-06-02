import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from '../locales/en/common.json';
import frCommon from '../locales/fr/common.json';

if (!i18n.isInitialized) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (i18n.use(initReactI18next) as any).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: { common: enCommon },
      fr: { common: frCommon },
    },
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    initImmediate: false,
  });
}

export default i18n;
