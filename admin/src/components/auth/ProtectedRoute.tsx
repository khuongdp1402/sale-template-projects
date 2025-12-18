import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/authContext';
import { Role } from '@/types/api';
import { hasPermission } from '@/lib/permissions';
import { PERMISSIONS } from '@/lib/permissions';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: Role[];
  permission?: keyof typeof PERMISSIONS;
}

export function ProtectedRoute({ children, requiredRoles, permission }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Check role-based access
  if (requiredRoles && !hasPermission(user.roles, requiredRoles)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Access Denied</h1>
          <p className="text-slate-600 dark:text-slate-400">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  // Check permission-based access
  if (permission && !hasPermission(user.roles, [...PERMISSIONS[permission]])) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Access Denied</h1>
          <p className="text-slate-600 dark:text-slate-400">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

