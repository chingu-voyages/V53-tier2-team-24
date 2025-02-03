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
         buttonsHover: '#6D355C', 
         lightPink: "#FFE6DE",
         darkPink: "#FF8080", 
         
      }
    },
  },
  plugins: [],
}

