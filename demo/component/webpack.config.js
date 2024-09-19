const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  target: "web",
  mode: "development", // Changed from "production" to "development"
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.m?(j|t)sx?$/,
        exclude: /(dist)/,
        loader: "babel-loader",
        options: {
          extends: path.resolve(__dirname, "./babel.config.json"),
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".jsx", ".tsx"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
  },
  externals: {
    "@krakenjs/zoid": "zoid",
  },
  optimization: {
    minimize: false, // Added to prevent minification
  },
};
