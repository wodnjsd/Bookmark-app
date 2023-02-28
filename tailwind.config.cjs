/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        chillax: ["Chillax", "sans-serif"],
        // 'inter': ['Inter', 'sans-serif']
      },
      backgroundImage: {
        banner: "url(./src/assets/backgrounds.svg)",
      },
      colors: {
        neutral: "#FFFAFA",
        pink: "#dfb7b7"
      },
    },
  },
  plugins: [],
};
