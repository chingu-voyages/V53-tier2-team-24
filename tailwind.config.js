/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
         background: '#FFF6F3',
         buttons: "#421B36",
         lightpink: "#FFE6DE",
         darkpink: "#FF8080",
         primaryColor: '#421B36', 
         primaryHover: '#6D355C', 
      }
    },
  },
  plugins: [],
}

