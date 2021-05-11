/* eslint-disable comma-dangle */

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const fs = require('fs');

function createHTMLPlugin(dir, file) {
  const [fileName, fileExt] = file.split('.');

  if (fileExt === 'pug') {
    return [
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, `${dir}/${file}`),
        filename: `assets/pages/${fileName}.html`,
        minify: { removeRedundantAttributes: false },
      }),
    ];
  }

  return [];
}

function generateHTMLPlugins(pagesDir) {
  const links = fs.readdirSync(path.resolve(__dirname, pagesDir));
  const plugins = [];

  links.forEach((item) => {
    if (item.indexOf('.') < 0) {
      plugins.push(...generateHTMLPlugins(`${pagesDir}/${item}`));
    } else {
      plugins.push(...createHTMLPlugin(pagesDir, item));
    }
  });

  return plugins;
}

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
    ...generateHTMLPlugins('src/pages'),
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
    new StylelintPlugin({
      configFile: path.resolve(__dirname, 'src/js/stylelint.config.js'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                config: path.resolve(__dirname, 'src/js/postcss.config.js'),
              },
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                config: path.resolve(__dirname, 'src/js/postcss.config.js'),
              },
            },
          },
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
