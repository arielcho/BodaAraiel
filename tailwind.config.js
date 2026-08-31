/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'script': ['"Great Vibes"', 'cursive'],
        'sans': ['"Inter"', 'sans-serif'],
      },
      colors: {
        'champagne': '#F7E7CE',
        'champagne-light': '#FFF8F0',
        'champagne-dark': '#EDD9B5',
        'gold': '#C9A84C',
        'gold-light': '#E8D5A3',
        'gold-dark': '#A8873A',
        'rose': '#F5D6D6',
        'rose-light': '#FDF0F0',
        'dark': '#3D2B1F',
        'cream': '#FFFFF0',
        'white': '#FFFFFF',
      }
    },
  },
  plugins: [],
}
