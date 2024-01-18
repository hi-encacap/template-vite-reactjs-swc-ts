/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      animation: {
        dash: "dash 1.5s ease-in-out infinite",
      },
      fontFamily: {
        "noto-sans": ["Noto Sans", "sans-serif"],
      },
      keyframes: {
        dash: {
          "0%": { "stroke-dasharray": "1, 150", "stroke-dashoffset": 0 },
          "50%": { "stroke-dasharray": "90, 150", "stroke-dashoffset": -35 },
          "100%": { "stroke-dasharray": "90, 150", "stroke-dashoffset": -124 },
        },
      },
    },
  },
  plugins: [],
};
