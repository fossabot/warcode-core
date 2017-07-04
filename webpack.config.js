const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'warcode-core.min.js',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};
