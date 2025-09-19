'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../context/auth.context';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('');
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    return isAuthenticated ? <>{children}</> : null;
};
