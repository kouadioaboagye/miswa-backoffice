// This file should contain alldesign systems colors and help uswith modularity ot easly change the color without breaking the app.
//  we must use convetionnal name for the colors and use them in the design system

/**
 * @description
 * ColorShade is a type that represents the different shades of a color
 */

export type ColorShade = {
    '50': string;
    '100': string;
    '200': string;
    '300': string;
    '400': string;
    '500': string;
    '600': string;
    '700': string;
    '800': string;
    '900': string;
};

/**
 * @description
 * ColorScheme is a type that represents the different color schemes
 * Note that the color schemes are primary, secondary, accent, info, success, warning, danger, and slate
 * It's design to implement the design system and make it easy to change the color of the app base on the theme
 */

export type ColorScheme = {
    primary: ColorShade;
    secondray: ColorShade;
    accent: ColorShade;
    // infos: ColorShade;
    // success: ColorShade;
    // warning: ColorShade;
    // danger: ColorShade;
    // slate: ColorShade;
};

export type Scheme = keyof ColorScheme;

export type ThemeColor = {
    'main-theme': ColorScheme;
    'blue-theme': ColorScheme;
};

export type Theme = keyof ThemeColor;

/**
 * @description
 *! ⚠️ all the colors should have the same color scheme
 *
 */

export const colors: ThemeColor = {
    'main-theme': {
        primary: {
            '50': '#fff3e0',
            '100': '#ffe0b2',
            '200': '#ffcc80',
            '300': '#ffb74d',
            '400': '#ffa726',
            '500': '#ff9800',
            '600': '#fb8c00',
            '700': '#f57c00',
            '800': '#ef6c00',
            '900': '#e65100'
        },
        secondray: {
            '50': '#e0f7fa',
            '100': '#b2ebf2',
            '200': '#80deea',
            '300': '#4dd0e1',
            '400': '#26c6da',
            '500': '#00bcd4',
            '600': '#00acc1',
            '700': '#0097a7',
            '800': '#00838f',
            '900': '#006064'
        },
        accent: {
            '50': '#ffe57f',
            '100': '#ffd740',
            '200': '#ffc400',
            '300': '#ffab00',
            '400': '#ff9800',
            '500': '#ff5722',
            '600': '#f4511e',
            '700': '#e64a19',
            '800': '#d84315',
            '900': '#bf360c'
        }
    },

    'blue-theme': {
        primary: {
            '50': '#e3f2fd',
            '100': '#bbdefb',
            '200': '#90caf9',
            '300': '#64b5f6',
            '400': '#42a5f5',
            '500': '#2196f3',
            '600': '#1e88e5',
            '700': '#1976d2',
            '800': '#1565c0',
            '900': '#0d47a1'
        },
        secondray: {
            '50': '#e1f5fe',
            '100': '#b3e5fc',
            '200': '#81d4fa',
            '300': '#4fc3f7',
            '400': '#29b6f6',
            '500': '#03a9f4',
            '600': '#039be5',
            '700': '#0288d1',
            '800': '#0277bd',
            '900': '#01579b'
        },
        accent: {
            '50': '#82b1ff',
            '100': '#448aff',
            '200': '#2979ff',
            '300': '#2962ff',
            '400': '#ff9800',
            '500': '#ff5722',
            '600': '#f4511e',
            '700': '#e64a19',
            '800': '#d84315',
            '900': '#bf360c'
        }
    }
};

/**
 *
 * @returns colorConfig
 * @description
 * This function is used to generate the color config for tailwindcss
 * under the form :  primary: {
      '50': 'var(--primary-50)',
      '100': 'var(--primary-100)',
      ....  for all the color scheme
 */

export const colorsConfigFn = () => {
    const theme = colors['main-theme'];
    const colorConfig: Record<string, Record<string, string>> = {};
    for (const color in theme) {
        const colorScheme = color as Scheme;
        Object.entries(theme[colorScheme]).forEach(([shade]) => {
            colorConfig[colorScheme] = {
                ...colorConfig[colorScheme],
                [shade]: `var(--${colorScheme}-${shade})`
            };
        });
    }

    return colorConfig;
};

export const colorsConfig = colorsConfigFn();

export const uniqueColor = {
    white: '#fff',
    black: '#000',
    transparent: 'transparent',
    currentColor: 'currentColor'
};
