import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from './en.json';
import vi from './vi.json';

export type Language = 'en' | 'vi';

type Messages = typeof en;

type I18nContextValue = {
  lang: Language;
  t: (key: string) => string;
  setLanguage: (lang: Language) => void;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const translations: Record<Language, Messages> = {
  en,
  vi,
};

const STORAGE_KEY = 'sale-template-lang';

function getNested(obj: any, path: string): string | undefined {
  return path.split('.').reduce((acc, part) => (acc && acc[part] != null ? acc[part] : undefined), obj);
}

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('vi');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored === 'en' || stored === 'vi') {
      setLang(stored);
    }
  }, []);

  const setLanguage = (next: Language) => {
    setLang(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const value = useMemo<I18nContextValue>(() => {
    const t = (key: string) => {
      const messages = translations[lang] ?? translations.vi;
      const found = getNested(messages, key);
      return typeof found === 'string' ? found : key;
    };

    return { lang, t, setLanguage };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextValue => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
};
