module.exports = {
  plugins: {
    tailwindcss: {},
    "postcss-px2rem": {
      remUnit: 37.5,
      remPrecision: 2,
      exclude: /node_modules|folder_name/i,
    },
  },
};
