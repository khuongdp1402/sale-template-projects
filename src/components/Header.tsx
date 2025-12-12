import React from 'react';
import { NavLink } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

const navLinkBase =
  'inline-flex items-center px-3 py-2 text-sm font-medium text-slate-100/80 hover:text-white hover:bg-white/5 rounded-md transition-colors';

const activeClass = ' text-white bg-white/10';

export const Header: React.FC = () => {
  const { t } = useI18n();

  return (
    <header className="border-b border-[#1a2d5a]/70 bg-[#050f2a]/90 text-white backdrop-blur">
      <div className="main-container flex items-center justify-between py-4 gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.PNG" alt="K-WingX logo" className="h-10 w-10 rounded-lg bg-white/5 p-1.5 shadow-lg" />
          <div className="hidden md:block">
            <img src="/logo-text.PNG" alt="K-WingX" className="h-9 w-auto drop-shadow-[0_6px_20px_rgba(62,184,255,0.35)]" />
          </div>
          <div className="block md:hidden">
            <img src="/logo-text.PNG" alt="K-WingX" className="h-5 w-auto drop-shadow-[0_4px_12px_rgba(62,184,255,0.35)]" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <nav className="hidden md:flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) => navLinkBase + (isActive ? activeClass : '')}
            >
              {t('nav.home')}
            </NavLink>
            <NavLink
              to="/templates"
              className={({ isActive }) => navLinkBase + (isActive ? activeClass : '')}
            >
              {t('nav.templates')}
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) => navLinkBase + (isActive ? activeClass : '')}
            >
              {t('nav.blog')}
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => navLinkBase + (isActive ? activeClass : '')}
            >
              {t('nav.contact')}
            </NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
