/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      backgroundColor: {
        a6c5e229: "#a6c5e229",
        "282e33": "#282e33",
        "1c2b41": "#1c2b41",
        "3d434a": "#3d434a",
        "9a9a9a": "#9a9a9a"
      },
      textColor: {
        b6c2cf: "#b6c2cf",
        "9fadbc": "#9fadbc",
      },
      borderColor: {
        b6c2cf: "#b6c2cf",
      },
      maxHeight: {
        615: "615px",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs")],
};
