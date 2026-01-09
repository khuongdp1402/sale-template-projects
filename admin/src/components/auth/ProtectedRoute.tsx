import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/authContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
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

  // Check role-based access - Simplified as per user request
  /* 
  if (requiredRoles && !hasPermission(user.roles, requiredRoles)) {
    // ...
  }
  */

  // Check permission-based access - Simplified as per user request
  /*
  if (permission && !hasPermission(user.roles, [...PERMISSIONS[permission]])) {
    // ...
  }
  */

  return <>{children}</>;
}

