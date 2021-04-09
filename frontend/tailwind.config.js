module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        kumbh: ["Kumbh Sans", "sans-serif"],
      },
      colors: {
        crane: "#5e1149",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
