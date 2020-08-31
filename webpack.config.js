const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);
const path = require('path');
const ghpages = require('gh-pages');

ghpages.publish('dist', function(err) {});

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    // port: 1337,
    // publicPath: `http://localhost:8080/`,
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`]
    })
  ]

};
