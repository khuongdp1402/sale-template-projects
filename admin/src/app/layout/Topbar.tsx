import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/authContext';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { LogOut, Moon, Sun, Search, Bell } from 'lucide-react';
import { ADMIN_ROUTES } from '@/config/routes';

export function Topbar() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ADMIN_ROUTES.LOGIN);
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-30">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left side - Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-[#1e293b] border-transparent focus:bg-white dark:focus:bg-[#1e293b] border focus:border-blue-500 rounded-lg text-sm transition-all outline-none"
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="relative text-slate-500 dark:text-slate-400">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0f172a]"></span>
          </Button>
          
          <Button variant="ghost" size="sm" onClick={toggleTheme} className="text-slate-500 dark:text-slate-400">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-2"></div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
