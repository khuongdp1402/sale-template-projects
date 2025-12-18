import { useState } from 'react';
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
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/features/auth/authContext';
import { ADMIN_ROUTES } from '@/config/routes';

const menuItems = [
  { path: ADMIN_ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { path: ADMIN_ROUTES.TEMPLATES, label: 'Templates', icon: Package },
  { path: ADMIN_ROUTES.BLOG, label: 'Blog', icon: FileText },
  { path: ADMIN_ROUTES.LANDING, label: 'Landing Sections', icon: FileText },
  { path: ADMIN_ROUTES.USERS, label: 'Users', icon: Users },
  { path: ADMIN_ROUTES.ORDERS, label: 'Orders', icon: ShoppingCart },
  { path: ADMIN_ROUTES.PAYMENTS, label: 'Payments', icon: CreditCard },
  { path: ADMIN_ROUTES.CONTACTS, label: 'Contacts', icon: MessageSquare },
  { path: ADMIN_ROUTES.MONITORING, label: 'Monitoring', icon: Activity },
  { path: ADMIN_ROUTES.DEPLOY, label: 'Deploy', icon: Rocket },
  { path: ADMIN_ROUTES.LOGS, label: 'Logs', icon: FileSearch },
];

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#0f172a] border border-slate-800 text-white"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen w-64 bg-[#0f172a] border-r border-slate-800 transition-transform lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <h1 className="text-lg font-bold text-white tracking-tight">K-WingX Admin</h1>
            </div>
          </div>

          {/* User info */}
          {user && (
            <div className="p-4 mx-4 my-4 rounded-xl bg-[#1e293b]/50 border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{user.username}</p>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar">
            <div className="mb-2 px-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Menu</span>
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === ADMIN_ROUTES.DASHBOARD}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                        : 'text-slate-400 hover:text-white hover:bg-[#1e293b]'
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn('h-5 w-5', 'transition-colors')} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800">
            <NavLink
              to={ADMIN_ROUTES.PROFILE}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
