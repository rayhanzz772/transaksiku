/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // penting banget! Pakai class, bukan media
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // pastikan path sesuai struktur projectmu
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
