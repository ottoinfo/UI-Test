require("babel-polyfill")
const webpack = require("webpack")
const path = require("path")
const autoprefixer = require('autoprefixer')
const validate = require("webpack-validator")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const pkg = require("./package.json")

const PATHS = {
  build: path.join(__dirname, "dist"),
  hbs: [ path.join(__dirname, "public") ],
  js: [ path.join(__dirname, "src") ],
  public: "/",
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
      {
        exclude: /node_modules/,
        include: PATHS.hbs,
        loader: "handlebars",
        test: /\.hbs$/,
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin("style.[hash].css", {
      allChunks: true,
      disable: false,
    }),
    new HtmlWebpackPlugin({
      author: "Matthew Otto",
      description: "UI Test",
      favicon: "public/images/favicon.jpg",
      filename: "index.html",
      template: "public/template.hbs",
      title: "UI Test",
    }),
  ],
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] }),
  ],
})