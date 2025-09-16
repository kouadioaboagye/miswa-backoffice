import type { ReactNode } from 'react';

import AppLayout from '@/shared/components/layouts/app-layout';

export default async function RootLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    return <AppLayout>{children}</AppLayout>;
}
