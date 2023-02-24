/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'chillax': ['Chillax', 'sans-serif'],
        // 'inter': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
