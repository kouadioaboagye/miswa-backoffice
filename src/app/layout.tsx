// Supports weights 100-900
import '@fontsource-variable/inter';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { siteConfig } from '@/config';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import GlobalModal from '@/shared/components/atoms/global-modal';
import { Provider } from './provider';
import './styles/globals.css';

export const metadata: Metadata = siteConfig.meta;

export default async function RootLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html>
            <body>
                <Provider>
                    <GlobalModal />
                    <NuqsAdapter>{children}</NuqsAdapter>
                </Provider>
            </body>
        </html>
    );
}
