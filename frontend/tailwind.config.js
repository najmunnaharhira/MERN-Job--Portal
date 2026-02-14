/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#141414",
        "brand": "#3575E2",
        "brand-hover": "#2a5fc4"
      }
    },
  },
  plugins: [],
}
