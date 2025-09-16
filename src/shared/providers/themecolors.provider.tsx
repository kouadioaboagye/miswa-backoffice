'use client';
import type { Scheme } from '@/app/styles/colors';
import { colors } from '@/app/styles/colors';
import type { PropsWithChildren } from 'react';
import { useLayoutEffect, useState } from 'react';
import { useUIStore } from '../store/useUIStore';
import { setThemeColor } from '../utils/setThemeColor';
import type { ThemeColor } from '@/app/styles/colors';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const { theme } = useUIStore();
    const [mounted, setMounted] = useState(false);

    useLayoutEffect(() => {
        const selectedThemeColor = colors[theme as keyof ThemeColor];
        for (const key in selectedThemeColor) {
            const color = key as Scheme;
            setThemeColor(selectedThemeColor[color], color);
        }
        setMounted(true);
    }, [theme]);

    // TODO : Find a better approach  to show the page with proper theme on start
    return <div className={mounted ? '' : 'invisible'}>{children}</div>;
};
