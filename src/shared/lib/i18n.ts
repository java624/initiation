import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/en.json';
import uk from '@/locales/uk.json';

export const defaultNS = 'translation';
export const resources = {
  uk: { translation: uk },
  en: { translation: en },
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
