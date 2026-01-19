import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authService } from '../services/auth.service';
import type { ApiResponse } from '../types/api.types';

interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: 'AGENT' | 'ADMIN' | 'SUPER_ADMIN';
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<ApiResponse<any>>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is already authenticated on mount
        checkAuth();
    }, []);

    const checkAuth = async () => {
        if (authService.isAuthenticated()) {
            try {
                const response = await authService.getCurrentUser();
                if (response.success && response.data) {
                    setUser(response.data as User);
                }
            } catch (error) {
                console.error('Failed to get current user:', error);
                authService.logout();
            }
        }
        setIsLoading(false);
    };

    const login = async (email: string, password: string): Promise<ApiResponse<any>> => {
        const response = await authService.login({ email, password });
        if (response.success && response.data) {
            // Fetch user details after successful login
            const userResponse = await authService.getCurrentUser();
            if (userResponse.success && userResponse.data) {
                setUser(userResponse.data as User);
            }
        }
        return response;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const refreshUser = async () => {
        if (authService.isAuthenticated()) {
            const response = await authService.getCurrentUser();
            if (response.success && response.data) {
                setUser(response.data as User);
            }
        }
    };

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user && authService.isAuthenticated(),
        login,
        logout,
        refreshUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
