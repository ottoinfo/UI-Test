require("babel-polyfill")
const webpack = require("webpack")
const path = require("path")
const autoprefixer = require('autoprefixer')
const validate = require("webpack-validator")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const pkg = require("./package.json")

const PATHS = {
  build: path.join(__dirname, "dist"),
  js: [ path.join(__dirname, "src") ],
  public: "/dist/",
  style: [ path.join(__dirname, "public", "css", "style.scss") ],
}

module.exports = validate({
  cache: true,
  debug: true,
  entry: {
    'babel-polyfill': 'babel-polyfill',
    app: PATHS.js,
    style: PATHS.style,
    vendor: Object.keys(pkg.dependencies),
  },
  output: {
    chunkFilename: "[hash].js",
    filename: "[name].[hash].js",
    path: PATHS.build,
    publicPath: PATHS.public,
  },
  eslint: {
    quiet: false,
    emitError: false,
    failOnWarning: false,
    failOnError: false,
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        include: PATHS.js,
        loaders: ["babel", "eslint-loader"],
        test: /\.jsx?$/,
      },
      {
        include: PATHS.style,
        loader: ExtractTextPlugin.extract(
          "style",
          "css!postcss!sass?outputStyle=expanded"
        ),
        test: /\.scss$/,
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin("style.[hash].css", {
      allChunks: true,
      disable: false,
    })
  ],
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] }),
  ],
})