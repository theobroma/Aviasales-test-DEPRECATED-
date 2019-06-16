'use strict';
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {};
config.entry = __dirname + '/src/app/app.jsx';

config.output = {
  path: __dirname + '/dist',
  // filename: '[name].[hash].js',
  filename: '[name].js',
};

config.resolve = {
  extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.jpeg', '.jpg', '.gif', '.png', '.svg'],
  alias: {
    images: path.resolve(__dirname, 'src/app/assets/images'),
  },
};

config.module = {
  rules: [
    {
      test: /\.jsx?$/,
      use: {
        loader: 'babel-loader?cacheDirectory',
        // options: {
        //   presets: ['env', 'react', 'stage-0']
        // }
      },
      exclude: /node_modules/,
    },
    {
      test: /\.(sass|scss|css)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          { loader: 'css-loader' },
          //{ loader: 'css-loader', options: { minimize: true } },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      }),
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file-loader?context=src/app/assets/images/&name=images/[path][name].[ext]',
        {
          // TODO: remove it to prod build
          // images loader
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        },
      ],
      exclude: /node_modules/,
      include: __dirname,
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'fonts/[name][hash].[ext]',
        },
      },
    },
  ],
};

config.externals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

config.performance = {
  hints: false,
};

config.optimization = {
  splitChunks: {
    cacheGroups: {
      commons: { test: /[\\/]node_modules[\\/]/, name: 'vendors', chunks: 'all' },
    },
  },
};

config.plugins = [
  new HtmlWebpackPlugin({
    template: __dirname + '/src/public/index.html',
    inject: 'body',
  }),
  new CopyWebpackPlugin([
    {
      from: __dirname + '/src/public',
    },
  ]),
  new ExtractTextPlugin({ filename: 'css/[name].css' }),
];

module.exports = config;
