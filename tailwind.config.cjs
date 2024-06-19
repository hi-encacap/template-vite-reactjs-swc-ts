/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      animation: {
        dash: "dash 1.5s ease-in-out infinite",
      },
      borderRadius: {
        llg: "0.625rem",
        "2.5xl": "1.25rem",
      },
      boxShadow: {
        centered: "0rem 0.3125rem 0.3125rem 0rem rgba(82, 63, 105, 0.05)",
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
        message: "#737B8B",
        "blue-primary": "rgb(77, 202, 255)",
        "blue-secondary": "rgb(78, 163, 224)",
        "blue-primary-light": "rgb(157, 192, 238)",
        "blue-primary-extra-light": "rgb(245, 249, 255)",
        "orange-primary": "rgb(255, 196, 107)",
        "orange-secondary": "rgb(255, 163, 24)",
        "orange-primary-light": "rgb(247, 217, 164)",
        "orange-primary-extra-light": "rgb(255, 248, 236)",
        primary: "#FF6A59",
      },
      fontFamily: {
        "reddit-sans": ["Reddit Sans", "sans-serif"],
      },
      fontSize: {
        md: "0.9375rem", // 15px
      },
      keyframes: {
        dash: {
          "0%": { "stroke-dasharray": "1, 150", "stroke-dashoffset": 0 },
          "50%": { "stroke-dasharray": "90, 150", "stroke-dashoffset": -35 },
          "100%": { "stroke-dasharray": "90, 150", "stroke-dashoffset": -124 },
        },
      },
      width: {
        66: "16.5rem",
        68: "17rem",
        70: "17.5rem",
        "screen-sm": "30rem", // 480px
        "screen-xsm": "36rem", // 576px
        "screen-smd": "42rem", // 672px
        "screen-md": "48rem", // 768px
        "screen-lg": "64rem", // 1024px
        "1/24": "4.166666666666667%",
        "fit-layout": "calc(100% - 264px)",
      },
      height: {
        8.5: "2.125rem", // 34px
        22: "5.5rem",
        "screen-sm": "30rem", // 480px
        "screen-xsm": "36rem", // 576px
      },
      spacing: {
        0.75: "0.1875rem", // 3px
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
