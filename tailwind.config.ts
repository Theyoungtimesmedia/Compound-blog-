/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          "neo-blue": "#2563EB", "neo-amber": "#F59E0B",
          "neo-pink": "#F43F5E", "neo-black": "#000000",
          "neo-white": "#FFFFFF", "neo-gray": "#F1F5F9",
        },
        fontFamily: {
          sans: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
          mono: ["JetBrains Mono", "monospace"],
        },
      },
    },
    plugins: [],
  }