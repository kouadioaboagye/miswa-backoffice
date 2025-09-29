'use client';

import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';

interface User {
    id: string;
    sub: string;
    firstname: string;
    lastname: string;
    account_type: string;
    email: string;
    profile: string;
    accessToken: string;
    refreshToken: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    logout: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const isLoading = status === 'loading';

    useEffect(() => {
        if (session?.user) {
            setIsAuthenticated(true);
            setUser(session.user as unknown as User);
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
    }, [session]);

    const logout = async () => {
        // Logique de déconnexion
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isLoading,
                user,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
