const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: '@/js/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    port: 4200,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/pug/pages/page_with_links.pug'),
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/pug/pages/ui_kit.pug'),
      filename: 'assets/pages/ui_kit.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/pug/pages/landing_page.pug'),
      filename: 'assets/pages/landing_page.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/pug/pages/search_room.pug'),
      filename: 'assets/pages/search_room.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/pug/pages/room_details.pug'),
      filename: 'assets/pages/room_details.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/pug/pages/registration_page.pug'),
      filename: 'assets/pages/registration_page.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/pug/pages/signin_page.pug'),
      filename: 'assets/pages/signin_page.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin([
      { filename: '[name].css' },
    ]),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/assets/fonts'), to: path.resolve(__dirname, 'dist/assets/fonts') },
        { from: path.resolve(__dirname, 'src/assets/images'), to: path.resolve(__dirname, 'dist/assets/images') },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true,
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        }],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
};
