/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--ff-base)",
        accent: "var(--ff-accent)",
      },
      fontSize:{
        md: 'var(--fs-md)',
        lg: 'var(--fs-lg)',
        xl: 'var(--fs-xl)',
      },
      colors:{
        primary: {
          500: "var(--clr-primary-500)"
        },
        secondary: {
          400: "var(--clr-secondary-400)"
        },
        neutral: {
          100: "var(--clr-neutral-100)",
          700: "var(--clr-neutral-700)",
        }
      },
      height: {
        header: 'var(--header-height)',
        main: 'calc(100vh - var(--header-height))'
      },
      minHeight: {
        header: 'var(--header-height)',
        main: 'calc(100vh - var(--header-height))'
      }

    },
  },
  plugins: [],
};
