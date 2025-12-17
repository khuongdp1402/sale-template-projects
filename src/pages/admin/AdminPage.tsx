import React from 'react';
import { useAuth } from '../../auth/useAuth';
import { RequireAuth } from '../../components/auth/RequireAuth';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiUsers, FiPackage, FiSettings, FiBarChart } from 'react-icons/fi';

export const AdminPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <RequireAuth>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="main-container py-10 pt-24">
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700 dark:text-sky-400 mb-4"
            >
              <FiArrowLeft className="h-4 w-4" />
              Quay lại trang chủ
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Trang quản trị</h1>
            <p className="text-slate-600 dark:text-slate-300">
              Chào mừng, <span className="font-semibold">{user?.username}</span>
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/admin/dashboard"
              className="group p-6 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400">
                  <FiBarChart className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Dashboard</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Xem tổng quan và thống kê
              </p>
            </Link>

            <Link
              to="/admin/users"
              className="group p-6 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  <FiUsers className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Quản lý người dùng</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Quản lý tài khoản người dùng
              </p>
            </Link>

            <Link
              to="/admin/purchases"
              className="group p-6 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  <FiPackage className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Quản lý mua hàng</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Xem và quản lý các giao dịch
              </p>
            </Link>

            <Link
              to="/admin/api"
              className="group p-6 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                  <FiSettings className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">API Access</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Quản lý API keys và tokens
              </p>
            </Link>

            <Link
              to="/admin/account"
              className="group p-6 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <FiSettings className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Cài đặt tài khoản</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Cập nhật thông tin cá nhân
              </p>
            </Link>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
};

