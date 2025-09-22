// Supports weights 100-900
import '@fontsource-variable/inter';
import '@fontsource-variable/urbanist';
import '@fontsource/dm-serif-display';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { siteConfig } from '@/config';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import './styles/globals.css';
import { Provider } from './provider';
import GlobalModal from '@/shared/components/atoms/global-modal';

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
