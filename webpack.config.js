const path = require('path');
const Md5Plugin = require('./Md5Plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js'
  },
  plugins: [
    new Md5Plugin({
      filename: 'file-md5-manifest.json'
    })
  ]
};
