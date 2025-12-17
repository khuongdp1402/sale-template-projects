import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  FileText,
  Users,
  ShoppingCart,
  CreditCard,
  MessageSquare,
  Activity,
  Rocket,
  FileSearch,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/features/auth/authContext';

const menuItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/templates', label: 'Templates', icon: Package },
  { path: '/admin/blog', label: 'Blog', icon: FileText },
  { path: '/admin/landing-sections', label: 'Landing Sections', icon: FileText },
  { path: '/admin/users', label: 'Users', icon: Users },
  { path: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { path: '/admin/payments', label: 'Payments', icon: CreditCard },
  { path: '/admin/contacts', label: 'Contacts', icon: MessageSquare },
  { path: '/admin/monitoring', label: 'Monitoring', icon: Activity },
  { path: '/admin/deploy', label: 'Deploy', icon: Rocket },
  { path: '/admin/logs', label: 'Logs', icon: FileSearch },
  { path: '/admin/settings/profile', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-transform lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-700">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">K-WingX Admin</h1>
          </div>

          {/* User info */}
          {user && (
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
              <p className="text-sm font-medium text-slate-900 dark:text-white">{user.username}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {user.roles.map((role) => (
                  <span
                    key={role}
                    className="text-xs px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    )
                  }
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

