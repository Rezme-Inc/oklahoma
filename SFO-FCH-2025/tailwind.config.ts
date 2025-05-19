import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core palette from style guide
        background: '#FFFFFF',
        foreground: '#000000',
        cinnabar: {
          DEFAULT: '#E54747', // Primary accent
          50: '#fbeaea',
          100: '#f6c6c6',
          200: '#f09e9e',
          300: '#ea7575',
          400: '#e54747',
          500: '#c93b3b',
          600: '#a02f2f',
          700: '#782323',
          800: '#501717',
          900: '#280b0b',
        },
        gray35: {
          DEFAULT: '#595959', // Secondary accent
          50: '#ededed',
          100: '#d6d6d6',
          200: '#bfbfbf',
          300: '#a8a8a8',
          400: '#919191',
          500: '#595959',
          600: '#474747',
          700: '#353535',
          800: '#232323',
          900: '#111111',
        },
        // Utility colors for UI
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#000000',
        },
        border: '#E5E5E5',
        input: '#F5F5F5',
        ring: '#E54747',
        // Chart and other custom colors can remain as before
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
