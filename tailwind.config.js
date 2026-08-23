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
        'oro': '#C9A84C',
        'oro-claro': '#E8D5A3',
        'rosa-polvo': '#F5D6D6',
        'vino': '#6B2D3B',
        'marfil': '#FDF7F0',
        'champagne': '#F7E7CE',
        'coral': '#E8837A',
        'salvia': '#A8B5A0',
        'crema': '#FFF8F0',
        'oscuro': '#1A0F0A',
      }
    },
  },
  plugins: [],
}