import type { ReactNode } from 'react';
import AuthProvider from '@/features/auth/components/AuthProvider';

export default async function RootLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    return <AuthProvider>{children} </AuthProvider>;
}
