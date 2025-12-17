import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/authContext';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { LogOut, Moon, Sun } from 'lucide-react';

export function Topbar() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <div className="h-full px-6 flex items-center justify-end gap-4">
        <Button variant="ghost" size="sm" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
}

