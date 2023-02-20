/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '15px 15px 30px 7px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
}
