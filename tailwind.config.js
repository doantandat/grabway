/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        batman: ['"SVN Batman Forever Alternate"', "system-ui", "sans-serif"],
      },
      
    },
  },
  plugins: [],
}
