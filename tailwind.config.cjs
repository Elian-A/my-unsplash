/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--ff-base)",
        accent: "var(--ff-accent)",
      }
    },
  },
  plugins: [],
};
