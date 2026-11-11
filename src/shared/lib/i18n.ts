import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/en/en.json';
import uk from '@/locales/uk/uk.json';
import de from '@/locales/de/de.json';

import enMain from '@/locales/en/main.json';
import ukMain from '@/locales/uk/main.json';
import deMain from '@/locales/de/main.json';

export const defaultNS = 'translation';
export const resources = {
  uk: { translation: uk, main: ukMain },
  en: { translation: en, main: enMain },
  de: { translation: de, main: deMain },
} as const;

if (!i18n.isInitialized) {
  // eslint-disable-next-line import/no-named-as-default-member
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources,
    lng: 'uk',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
