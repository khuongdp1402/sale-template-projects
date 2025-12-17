import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../auth/useAuth';
import { FiUser, FiLogOut, FiSettings, FiChevronDown, FiX } from 'react-icons/fi';

const navLinkBase =
  'inline-flex items-center px-3 py-2 text-sm font-medium text-slate-100/80 hover:text-white hover:bg-white/5 rounded-md transition-colors';

const activeClass = ' text-white bg-white/10';

export const Header: React.FC = () => {
  const { t } = useI18n();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  const handleViewProfile = () => {
    setIsUserInfoOpen(true);
    setIsDropdownOpen(false);
  };

  const handleGoToAdmin = () => {
    setIsDropdownOpen(false);
    // Mở tab mới và trỏ thẳng tới /admin/dashboard
    window.open('/admin/dashboard', '_blank');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a2d5a]/70 bg-[#050f2a]/90 text-white backdrop-blur">
        <div className="main-container flex items-center justify-between py-4 gap-4">
          <div className="flex items-center gap-3">
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
              {isAuthenticated && user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-100/80 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                  >
                    <span className="hidden sm:inline">{user.username}</span>
                    <FiChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#050f2a] border border-[#1a2d5a]/70 backdrop-blur z-50">
                      <div className="py-1">
                        <button
                          onClick={handleViewProfile}
                          className="w-full text-left px-4 py-2 text-sm text-slate-100 hover:bg-white/10 flex items-center gap-2"
                        >
                          <FiUser className="h-4 w-4" />
                          Xem thông tin
                        </button>
                        <button
                          onClick={handleGoToAdmin}
                          className="w-full text-left px-4 py-2 text-sm text-slate-100 hover:bg-white/10 flex items-center gap-2"
                        >
                          <FiSettings className="h-4 w-4" />
                          Trang quản trị
                        </button>
                        <div className="border-t border-[#1a2d5a]/70 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10 flex items-center gap-2"
                        >
                          <FiLogOut className="h-4 w-4" />
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors"
                >
                  Đăng nhập
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* User Info Modal */}
      {isUserInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setIsUserInfoOpen(false)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Thông tin tài khoản</h2>
              <button
                onClick={() => setIsUserInfoOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
            {user && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tên đăng nhập</label>
                  <p className="text-slate-900 dark:text-white">{user.username}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <p className="text-slate-900 dark:text-white">{user.email}</p>
                </div>
                {user.phone && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Số điện thoại</label>
                    <p className="text-slate-900 dark:text-white">{user.phone}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Ngày tạo</label>
                  <p className="text-slate-900 dark:text-white">{new Date(user.createdAt).toLocaleDateString('vi-VN')}</p>
                </div>
              </div>
            )}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsUserInfoOpen(false)}
                className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
