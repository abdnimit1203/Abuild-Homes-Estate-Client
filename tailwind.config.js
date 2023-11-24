/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: [
      {
        mytheme: {
        
            "primary": "#38B6FF",
                    
            "secondary": "#FF3131",
                    
            "accent": "#FF914D",
                    
            "neutral": "#545454",
                    
            "base-100": "#f8f7fd",
                    
            "info": "#fda4af",
                    
            "success": "#18b47b",
                    
            "warning": "#f0d447",
                    
            "error": "#f41042",
        },
      },
    ],
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
