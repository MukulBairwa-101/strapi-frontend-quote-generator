/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-shade-alt': '#122536',
        'gray-shade':'#64748b'
      },
    },
  },
  plugins: [],
}