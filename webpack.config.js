require("babel-polyfill")
const webpack = require("webpack")
const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  cache: true,
  debug: true,
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  eslint: {
    quiet: false,
    emitError: false,
    failOnWarning: false,
    failOnError: false,
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      include: path.resolve(__dirname, "./src"),
      loaders: ["babel", "eslint-loader"],
      test: /\.jsx?$/,
    }]
      // },
      // {
      //   test: /\.scss$/,
      //   include: path.resolve("./src/css"),
      //   loader: ExtractTextPlugin.extract(
      //     "style",
      //     "css!"+
      //     "sass?outputStyle=expanded"
      //   )
      // },
      // {
      //   test: /\.scss$/,
      //   include: path.resolve("./src/js/components"),
      //   loader: ExtractTextPlugin.extract(
      //     "style", 
      //     "css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!"+
      //     "sass?outputStyle=expanded!"+
      //     "sass-resources"
      //   )
      // }
  },
  plugins: [
    new ExtractTextPlugin("main.css", {
      allChunks: true,
      disable: false,
    })
  ]
};