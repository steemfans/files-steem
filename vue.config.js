module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.md$/i,
          use: 'raw-loader'
        },
      ],
    },
  },
  devServer: {
    port: 3005,
  },
};