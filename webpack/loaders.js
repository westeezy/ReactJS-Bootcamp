var path = require('path');
var pkg = require('../package.json');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var DEBUG = process.env.NODE_ENV === 'development';
var TEST = process.env.NODE_ENV === 'test';

var jsxLoader;
var sassLoader;
var cssLoader;
var fileLoader = 'file-loader?name=[path][name].[ext]';
var htmlLoader = [
  'file-loader?name=[path][name].[ext]',
  'template-html-loader?' + [
    'raw=true',
    'engine=lodash',
    'version=' + pkg.version,
    'title=' + pkg.name,
    'debug=' + DEBUG
  ].join('&')
].join('!');
var jsonLoader = ['json-loader'];

var sassParams = [
  'outputStyle=expanded',
  'includePaths[]=' + path.resolve(__dirname, '../app/scss'),
  'includePaths[]=' + path.resolve(__dirname, '../node_modules')
];

if (DEBUG || TEST) {
  jsxLoader = [];
  if(TEST) {
    jsxLoader.push('isparta');
    //Not needed since .babelrc. keeping for legacy reasons
    //jsxLoader.push('babel-loader?optional[]=runtime&stage=0&plugins=rewire');
  } else {
    jsxLoader.push('babel-loader?optional[]=runtime&stage=0');
  }
  sassParams.push('sourceMap', 'sourceMapContents=true');
  sassLoader = [
    'style-loader',
    'css-loader?sourceMap',
    'postcss-loader',
    'sass-loader?' + sassParams.join('&')
  ].join('!');
  cssLoader = [
    'style-loader',
    'css-loader?sourceMap',
    'postcss-loader'
  ].join('!');
} else {
  jsxLoader = ['babel-loader?optional=runtime'];
  sassLoader = ExtractTextPlugin.extract('style-loader', [
    'css-loader',
    'postcss-loader',
    'sass-loader?' + sassParams.join('&')
  ].join('!'));
  cssLoader = ExtractTextPlugin.extract('style-loader', [
    'css-loader',
    'postcss-loader'
  ].join('!'));
}

var loaders = [
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
    test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: fileLoader
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
