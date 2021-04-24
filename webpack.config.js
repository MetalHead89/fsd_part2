const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

function generateHTMLplugins(pagesDir) {
  const links = fs.readdirSync(path.resolve(__dirname, pagesDir));
  const plugins = [];

  links.forEach((item) => {
    if (item.indexOf('.') >= 0) {
      const [fileName, fileExt] = item.split('.');
      if (fileExt === 'pug') {
        plugins.push(
          new HTMLWebpackPlugin({
            template: path.resolve(__dirname, `${pagesDir}/${item}`),
            filename: `assets/pages/${fileName}.html`,
          })
        );
      }
    } else {
      plugins.push(...generateHTMLplugins(`${pagesDir}/${item}`));
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
    ...generateHTMLplugins('src/pages'),
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
