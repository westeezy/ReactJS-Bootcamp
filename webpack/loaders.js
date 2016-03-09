'use strict'; // eslint-disable-line strict

const path = require('path');
const pkg = require('../package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEBUG = process.env.NODE_ENV === 'development';
const TEST = process.env.NODE_ENV === 'test';

let jsxLoader;
let sassLoader;
const fileLoader = 'file-loader?name=[path][name].[ext]';
const cssLoader = 'style!css!postcss';
const fontLoader = 'url?limit=10000&mimetype=application/font-woff&prefix=fonts';
const htmlLoader = [
  'file-loader?name=[path][name].[ext]',
  `template-html-loader?${[
    'raw=true',
    'engine=lodash',
    `version=${pkg.version}`,
    `title=${pkg.name}`,
    `debug=${DEBUG}`
  ].join('&')}`
].join('!');
const jsonLoader = ['json-loader'];

const sassParams = [
  'outputStyle=expanded',
  `includePaths[]=${path.resolve(__dirname, '../app/scss')}`,
  `includePaths[]=${path.resolve(__dirname, '../node_modules')}`
];

if (DEBUG || TEST) {
  jsxLoader = [];
  if (TEST) {
    jsxLoader.push('isparta');
    // Not needed since .babelrc. keeping for legacy reasons
    // jsxLoader.push('babel-loader?optional[]=runtime&stage=0&plugins=rewire');
  } else {
    jsxLoader.push('babel-loader');
  }
  sassParams.push('sourceMap', 'sourceMapContents=true');
  sassLoader = [
    'style-loader',
    'css-loader?sourceMap',
    'postcss-loader',
    `sass-loader?${sassParams.join('&')}`
  ].join('!');
} else {
  jsxLoader = ['babel-loader'];
  sassLoader = ExtractTextPlugin.extract('style-loader', [
    'css-loader',
    'postcss-loader',
    `sass-loader?${sassParams.join('&')}`
  ].join('!'));
}

const loaders = [
  {
    test: /-test.js(x|)*/,
    loader: 'babel-loader'
  },
  {
    test: /\.js(x|)?$/,
    exclude: /(node_modules|-test*)/,
    loaders: jsxLoader
  },
  {
    test: /\.css$/,
    loader: cssLoader
  },
  {
    test: /\.(woff|woff2|ttf|eot|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    loader: fontLoader
  },
  {
    test: /\.jpe?g$|\.gif$|\.png$/,
    loader: fileLoader
  },
  {
    test: /\.json$/,
    exclude: /node_modules/,
    loaders: jsonLoader
  },
  {
    test: /\.html$/,
    loader: htmlLoader
  },
  {
    test: /\.scss$/,
    loader: sassLoader,
    exclude: /(node_modules)/
  }
];

module.exports = loaders;
