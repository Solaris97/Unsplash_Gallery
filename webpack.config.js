const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool: process.env.NODE_ENV === "production" ? "hidden-source-map" : "eval",
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.css?$/,
        exclude: [],
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg|webp)$/,
        exclude: [],
        use: ["file-loader"],
      },
    ],
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    static: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@list": path.resolve(__dirname, "./src/recoil/list"),
      "@router": path.resolve(__dirname, "./src/router"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@icon": path.resolve(__dirname, "./src/assets/icon"),
      "@img": path.resolve(__dirname, "./src/assets/img"),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      hash: true,
      favicon: "favicon/favicon.ico",
    }),
    new webpack.DefinePlugin({
      "process.env.UNSPLASH_API_KEY": JSON.stringify(process.env.UNSPLASH_API_KEY),
      "process.env.UNSPLASH_ACCESS_TOKEN": JSON.stringify(process.env.UNSPLASH_ACCESS_TOKEN),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
