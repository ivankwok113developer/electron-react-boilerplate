/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#1E1E1E',
        'bg-2': '#242424',
      },
    },
    plugins: [],
  },
};
