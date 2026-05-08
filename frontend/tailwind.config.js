// module.exports = {
//   purge: [],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {},
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "hover:scale-105",
    "hover:scale-110",
    "hover:-translate-y-2",
    "transition-transform",
    "duration-300",
    "shadow-2xl",
  ],
  theme: {
    extend: {
      colors: {
        orangeCustom: "#FE9B32",
      },
    },
  },
  plugins: [],
};
