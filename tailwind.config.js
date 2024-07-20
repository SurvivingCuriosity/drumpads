/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'hsl(var(--primary) / <alpha-value>)',
        "primary-light":"hsl(var(--primary-light) / <alpha-value>)",
        "primary-lighter":"hsl(var(--primary-lighter) / <alpha-value>)",
        "primary-lightest":"hsl(var(--primary-lightest) / <alpha-value>)",
        "primary-dark":"hsl(var(--primary-dark) / <alpha-value>)",
        "primary-darker":"hsl(var(--primary-darker) / <alpha-value>)",
        "primary-darkest":"hsl(var(--primary-darkest) / <alpha-value>)",
      },
      keyframes:{
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      }
    },
  },
  plugins: [],
}