/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050d1a',
          900: '#0a1628',
          800: '#0f2140',
          700: '#162d58',
          600: '#1e3a6e',
        },
        brand: {
          blue: '#1a6fc4',
          accent: '#0ea5e9',
          cyan: '#22d3ee',
        }
      },
      fontFamily: {
        primary: ['Outfit', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
