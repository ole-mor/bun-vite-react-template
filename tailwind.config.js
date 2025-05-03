// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust paths as needed
  ],
  theme: {
    extend: {
      fontFamily: {
        // Keep Assistant as default sans-serif (or adjust as needed)
        sans: ['Assistant', ...defaultTheme.fontFamily.sans],
        // Add your custom font family
        modak: ['Modak', 'cursive'],
      },
    },
  },
  plugins: [],
}