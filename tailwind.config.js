/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minW72: { minWidth: "18rem" }
    },
  },
  plugins: [],
}

