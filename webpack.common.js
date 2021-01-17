const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const htmlPageNames = ['services', 'prices-and-discounts', 'for-organizations', 'reviews', 'contacts', 'privacy', '404'];
const multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    filename: `${name}.html`, // output HTML files
    template: path.resolve(__dirname, 'src', `${name}.html`),
    chunks: [`${name}`] // respective JS files
  });
});

module.exports = {
  entry: {
    main: './src/index.js',
    services: './src/services.js',
    'prices-and-discounts': './src/prices-and-discounts.js',
    'for-organizations': './src/for-organizations.js',
    'reviews': './src/reviews.js',
    'contacts': './src/contacts.js',
    privacy: './src/privacy.js',
    404: './src/404.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: 'images/',
            outputPath: 'images/'
          }
        }
      },
      {
        test: /\.(xml|webmanifest)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '/',
            outputPath: '/'
          }
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
      chunks: ['main']
    }),
    new MiniCssExtractPlugin({
      filename: 'customstyle.css',
      publicPath: ''
    })
  ].concat(multipleHtmlPlugins)
};
