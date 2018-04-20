// Config according to
const path = require('path');

const PATHS = {
  app: path.resolve(__dirname, 'app'),
  build: path.resolve(__dirname, 'build'),
};
module.exports = {
  entry: {
    app: `${PATHS.app}/index.js`,
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'sass-loader', // compiles Sass to CSS
        }],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'assets/img/[hash]-[name].[ext]',
          },
        }],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['eslint-loader'],
      },
    ],
  },
  mode: 'development',

  devServer: {
    historyApiFallback: true,
    host: '127.0.0.1',
    port: 8080,
  },
};
