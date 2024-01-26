/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      animation: {
        dash: "dash 1.5s ease-in-out infinite",
      },
      colors: {
        "green-primary": "rgb(72, 202, 147)",
        "green-primary-dark": "rgb(72, 193, 181)",
        "green-primary-light": "rgb(246, 255, 249)",
        "cyan-primary": "rgb(72, 186, 202)",
        "red-primary": "rgb(232, 139, 118)",
        "red-primary-light": "rgb(244, 176, 161)",
        "red-primary-extra-light": "rgb(255, 245, 243)",
        "red-secondary": "rgb(202, 80, 72)",
        title: "rgb(39, 48, 58)",
        message: "rgb(47, 63, 83)",
        "blue-primary": "rgb(77, 202, 255)",
        "blue-secondary": "rgb(78, 163, 224)",
        "blue-primary-light": "rgb(157, 192, 238)",
        "blue-primary-extra-light": "rgb(245, 249, 255)",
        "orange-primary": "rgb(255, 196, 107)",
        "orange-secondary": "rgb(255, 163, 24)",
        "orange-primary-light": "rgb(247, 217, 164)",
        "orange-primary-extra-light": "rgb(255, 248, 236)",
      },
      fontFamily: {
        "noto-sans": ["Noto Sans", "sans-serif"],
        "source-sans-3": ["Source Sans 3", "sans-serif"],
        "be-vietnam-pro": ["Be Vietnam Pro", "sans-serif"],
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
