import type { Config } from 'tailwindcss';
import { colorsConfig, uniqueColor } from './src/app/styles/colors';

const config: Config = {
    darkMode: ['class'],
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-button':
                    'linear-gradient(to right, #072748 0%, #0E4D79 100%)',
                'gradient-button-hover':
                    'linear-gradient(90deg, #0E4D79 0%, #072748 100%)'
            },

            colors: {
                'newsletter-color': '#FFD2C1',
                ...colorsConfig,
                ...uniqueColor,
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'caret-blink': {
                    '0%,70%,100%': { opacity: '1' },
                    '20%,50%': { opacity: '0' }
                }
            },
            animation: {
                'caret-blink': 'caret-blink 1.25s ease-out infinite'
            }
        }
    }
    // plugins: [require('tailwindcss-animate')]
};
export default config;
