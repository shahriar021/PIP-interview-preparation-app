import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from '../locales/en.json';
import es from '../locales/es.json';
import ht from '../locales/ht.json';

const LANGUAGE_KEY = '@app_language'; // AsyncStorage key

// Detect device language
const getDeviceLanguage = () => {
  const locales = RNLocalize.getLocales();
  const deviceLang = locales[0]?.languageCode;
  const supported = ['en', 'es', 'ht'];
  return supported.includes(deviceLang) ? deviceLang : 'en'; // fallback to English
};

// Load saved language from storage
export const initLanguage = async () => {
  const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
  return saved || getDeviceLanguage();
};

// Change language and save preference
export const changeLanguage = async (lang: 'en' | 'es' | 'ht') => {
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  await i18n.changeLanguage(lang);
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',   // required for Android
    resources: {
      en: { translation: en },
      es: { translation: es },
      ht: { translation: ht },
    },
    lng: 'en',          // default, will be overridden
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;