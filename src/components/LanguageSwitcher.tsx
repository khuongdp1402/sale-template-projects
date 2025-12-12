import React from 'react';
import { useI18n, Language } from '../i18n/I18nContext';

const languages: { code: Language; label: string }[] = [
  { code: 'vi', label: 'VI' },
  { code: 'en', label: 'EN' },
];

export const LanguageSwitcher: React.FC = () => {
  const { lang, setLanguage } = useI18n();

  return (
    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 text-[11px] font-medium text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
      {languages.map((item) => {
        const isActive = item.code === lang;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLanguage(item.code)}
            className={`px-2 py-1 rounded-full transition-colors ${
              isActive
                ? 'bg-primary-600 text-white dark:bg-primary-500'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};
