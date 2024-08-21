/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // keyframes: {
      //   slideIn: {
      //     '0%': { opacity: 0, transform: 'translateY(-20px)' },
      //     '100%': { opacity: 1, transform: 'translateY(0)' },
      //   },
      // },
      // animation: {
      //   slideIn: 'slideIn 0.5s ease-out',
      // },
      keyframes: {
        slideDown: {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 1, transform: 'translateY(10px)' },
        },
        fadeIn: {
          '0%': { opacity: 0.5 },
          '100%': { opacity: 1 },
        }
      },
      animation: {
        slideDown: 'slideDown 1s ease-out',
        fadeIn: 'fadeIn 0.5s ease-out',
      },
      colors: {
        primary: '#0f212e',
        secondary: '#213743',
        danger: '#1a2c38',
        btnGreen:'rgb(0 231 1)',
        btnBlue:'rgb(20 117 225)'
        // Add more custom colors here
      }
    },
  },
  plugins: [],
}

