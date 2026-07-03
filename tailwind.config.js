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
          950: '#060B13',
          900: '#0B1220',
          800: '#111D32',
          700: '#1C2E4C',
          600: '#28416A',
          500: '#3D5C8F',
        },
        accent: {
          gold: '#E5BA73',
          blue: '#38BDF8',
          emerald: '#10B981',
          crimson: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
