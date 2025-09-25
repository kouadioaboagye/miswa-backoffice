import type { ColorShade, Scheme } from '@/app/styles/colors';

export const setThemeColor = (theme: ColorShade, color: Scheme) => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([shade, value]) => {
        root.style.setProperty(`--${color}-${shade}`, value);
    });
};
