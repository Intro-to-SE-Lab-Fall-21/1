module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'e-client': "url('../public/e-client.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
