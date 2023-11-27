/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#38B6FF",

          secondary: "#FF3131",

          accent: "#FCB690",

          neutral: "#494949",

          "base-100": "#f8f7fd",
          "base-200": "#fff",
          

          info: "#fda4af",

          success: "#18b47b",

          warning: "#f0d447",

          error: "#f41042",
        },
      },
      "light",
      "synthwave",
      {
        dark: {
          primary: "#38B6FF",

          secondary: "#FF3131",

          accent: "#FCB690",

          neutral: "#ffffff",

          "base-100": "#282828",
          "base-200": "#303030",

          info: "#fda4af",

          success: "#18b47b",

          warning: "#f0d447",

          error: "#f41042",
        },
      },
    ],
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
