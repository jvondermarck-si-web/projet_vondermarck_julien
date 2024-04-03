/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'italiana': ['Italiana', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        pulse: "pulse 1.5s ease-in-out 0s infinite"
      },
      keyframes: {
        pulse: {
          "0%, 100%": {
            opacity: 1,
            transform: "scale(1)"
          },
          "50%": {
            opacity: 0.5,
            transform: "scale(0.8)"
          }
        }
      }
    },
  },
  plugins: [],
}
