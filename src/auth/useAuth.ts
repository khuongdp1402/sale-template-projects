import { useState, useEffect, useCallback } from 'react';
import { Session } from './authTypes';
import {
    getCurrentSession,
    loginWithPassword,
    loginWithGoogleMock,
    register,
    logout as logoutFn,
    updateUserProfile,
    changePassword,
} from './authStore';
import type { LoginCredentials, RegisterData, AuthError } from './authTypes';

export const useAuth = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    // Initialize session from localStorage
    useEffect(() => {
        const currentSession = getCurrentSession();
        setSession(currentSession);
        setLoading(false);
    }, []);

    const login = useCallback(async (credentials: LoginCredentials): Promise<{ success: boolean; error?: AuthError }> => {
        const result = loginWithPassword(credentials);
        if (result.success && result.session) {
            setSession(result.session);
        }
        return { success: result.success, error: result.error };
    }, []);

    const loginGoogle = useCallback(async (): Promise<{ success: boolean }> => {
        // Simulate async Google OAuth
        await new Promise(resolve => setTimeout(resolve, 1000));
        const result = loginWithGoogleMock();
        if (result.success && result.session) {
            setSession(result.session);
        }
        return { success: result.success };
    }, []);

    const registerUser = useCallback(async (data: RegisterData): Promise<{ success: boolean; errors?: AuthError[] }> => {
        const result = register(data);
        if (result.success && result.session) {
            setSession(result.session);
        }
        return { success: result.success, errors: result.errors };
    }, []);

    const logout = useCallback(() => {
        logoutFn();
        setSession(null);
    }, []);

    const updateProfile = useCallback(async (updates: Parameters<typeof updateUserProfile>[0]): Promise<{ success: boolean; error?: AuthError }> => {
        const result = updateUserProfile(updates);
        if (result.success) {
            const updatedSession = getCurrentSession();
            setSession(updatedSession);
        }
        return result;
    }, []);

    const updatePassword = useCallback(async (currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: AuthError }> => {
        return changePassword(currentPassword, newPassword);
    }, []);

    return {
        session,
        user: session?.user || null,
        isAuthenticated: !!session,
        loading,
        login,
        loginGoogle,
        register: registerUser,
        logout,
        updateProfile,
        updatePassword,
    };
};
