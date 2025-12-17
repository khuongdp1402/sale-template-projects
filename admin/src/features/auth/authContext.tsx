import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginCredentials, AuthResponse } from '@/types/api';
import { apiClient } from '@/lib/apiClient';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token and user
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    // For development: Always allow fake login
    // In production, this should be removed and only use real API
    if (import.meta.env.DEV) {
      const fakeUser: User = {
        id: '1',
        username: credentials.usernameOrEmail || 'admin',
        email: credentials.usernameOrEmail?.includes('@') 
          ? credentials.usernameOrEmail 
          : `${credentials.usernameOrEmail || 'admin'}@kwingx.com`,
        roles: ['SuperAdmin'],
        status: 'active',
        createdAt: new Date().toISOString(),
      };
      const fakeToken = 'fake_jwt_token_' + Date.now();
      
      apiClient.setToken(fakeToken);
      localStorage.setItem('admin_user', JSON.stringify(fakeUser));
      setUser(fakeUser);
      return;
    }

    // Production: Use real API
    try {
      const response = await apiClient.post<AuthResponse>('/api/admin/auth/login', credentials);
      const { token, user: userData } = response.data;
      
      apiClient.setToken(token);
      localStorage.setItem('admin_user', JSON.stringify(userData));
      setUser(userData);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    apiClient.clearToken();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const response = await apiClient.get<User>('/api/admin/auth/me');
      const userData = response.data;
      localStorage.setItem('admin_user', JSON.stringify(userData));
      setUser(userData);
    } catch {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

