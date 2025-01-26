/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFF6F3', 
        primaryColor: '#421B36', 
        primaryHover: '#6D355C', 
      },
    },
  },
  plugins: [],
}

