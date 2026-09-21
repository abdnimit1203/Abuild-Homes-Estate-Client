/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#38B6FF",

          secondary: "#FF5A3C",

          accent: "#FCB690",

          neutral: "#494949",

          "base-100": "#f8f7fd",
          "base-200": "#fff",
          

          info: "#fda4af",

          success: "#18b47b",

          warning: "#f0d447",

          error: "#E11D48",
        },
      },
      "light",
      "synthwave",
      {
        dark: {
          primary: "#38B6FF",

          secondary: "#FF5A3C",

          accent: "#FCB690",

          neutral: "#ffffff",

          "base-100": "#282828",
          "base-200": "#303030",

          info: "#fda4af",

          success: "#18b47b",

          warning: "#f0d447",

          error: "#E11D48",
        },
      },
    ],
  },
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [require("daisyui"),
  plugin(function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        'text-shadow': (value) => ({
          textShadow: value,
        }),
      },
      { values: theme('textShadow') }
    )
  }),
],
};
