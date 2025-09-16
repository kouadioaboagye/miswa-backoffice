'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../context/auth.context';
import { paths } from '@/config/app-route.config';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push(paths.auth.particular);
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    return isAuthenticated ? <>{children}</> : null;
};
