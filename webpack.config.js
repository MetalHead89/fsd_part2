const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: '@/index.js',
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
      template: path.resolve(
        __dirname,
        'src/pages/page-with-links/page-with-links.pug'
      ),
      favicon: path.resolve(__dirname, 'favicon.ico'),
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/pages/ui-kit/ui-kit.pug'),
      filename: 'assets/pages/ui-kit.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(
        __dirname,
        'src/pages/landing-page/landing-page.pug'
      ),
      filename: 'assets/pages/landing-page.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(
        __dirname,
        'src/pages/search-room/search-room.pug'
      ),
      filename: 'assets/pages/search-room.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(
        __dirname,
        'src/pages/room-details/room-details.pug'
      ),
      filename: 'assets/pages/room-details.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(
        __dirname,
        'src/pages/registration-page/registration-page.pug'
      ),
      filename: 'assets/pages/registration-page.html',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(
        __dirname,
        'src/pages/signin-page/signin-page.pug'
      ),
      filename: 'assets/pages/signin-page.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin([{ filename: '[name].css' }]),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/fonts'),
          to: path.resolve(__dirname, 'dist/assets/fonts'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/images'),
          to: path.resolve(__dirname, 'dist/assets/images'),
        },
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
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
};
