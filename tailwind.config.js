/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './css/**/*.{css,pcss}',
    './js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        deepBlue: '#0A192F',
        oceanCyan: '#115D8C',
        shallowBlue: '#4FC3F7',
        auroraPurple: '#7B61FF',
        ecoGreen: '#00DFC0',
        warnOrange: '#FF9800',
        dangerRed: '#FF5252',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        condensed: ['"Roboto Condensed"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
