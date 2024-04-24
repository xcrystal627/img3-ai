/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sp': '375px',
      'sm': '400px',
      'tablet': '640px',
      'md': '768px',
      'md800': '800px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '2.5rem',
      '5.5xl': '3rem',
      '6xl': '3.75rem',
    },
    extend: {
      colors: {
        primary: '#2cb3ff',
        primary50: '#eff8ff',
        primary100: '#dff0ff',
        primary200: '#b8e3ff',
        primary300: '#78ceff',
        primary400: '#5fcfff',
        primary500: '#2cb3ff',
        primary600: '#007bce',
        secondary: '#727272',
        background: '#eff8ff',
        appBlue: '#2F80ED'
      },
      padding: {
        '22': '48px',
      },
      maxWidth: {
        '800': '800px',
        '1280': '1280px',
        '1440': '1440px',
      },
      maxHeight: {
        '256': '256px',
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      fontFamily: {
        notojp: ['Noto Sans JP', 'sans-serif'],
        kasugi: ['Kosugi Maru', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}
