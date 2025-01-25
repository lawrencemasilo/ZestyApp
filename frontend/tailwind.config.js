/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customHoverBg: '#333333', // Custom hover background (gray-600 equivalent)
        customHoverText: '#FFFFFF', // Custom hover text color (white)
      },
    },
  },
  plugins: [],
}

