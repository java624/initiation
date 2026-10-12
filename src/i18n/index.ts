import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import enTranslation from './locales/en/translation.json';
import ukTranslation from './locales/uk/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  uk: {
    translation: ukTranslation,
  },
};

const initI18n = async () => {
  const locale = Localization.getLocales()[0]?.languageCode ?? 'en';

  await i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v4', // Потрібно для React Native
      resources,
      lng: locale,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
};

initI18n();

export default i18n;