/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "noto-sans": ["Noto Sans", "sans-serif"]
      },
    },
  },
  plugins: [],
};
