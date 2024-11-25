/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Ensure Tailwind processes your HTML file
    "./src/**/*.{js,jsx,ts,tsx}", // This ensures Tailwind processes all the React files (JSX/TSX)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}