/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'sign-in' : "url('/src/assets/yes1.jpg')",
      }
    },
  },
  plugins: [],
}