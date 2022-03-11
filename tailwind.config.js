module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      color: {
        star: '#EBA430'
      },
      height: {
        book: 'calc(100% - 120px)'
      },
      width: {
        cart: '500px'
      },
      boxShadow: {
        product: '0px 30px 60px rgba(0, 0, 0, 0.15)'
      }
    },
  },
  plugins: [],
}
