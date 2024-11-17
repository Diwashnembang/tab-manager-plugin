const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "production",
  entry: {
    background: "./src/background.ts",
    content: "./src/content.ts",
    popup: "./src/popup.ts",
    learn:"./src/learn.ts"
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/, // For HTML files
        use: "html-loader", // Use html-loader to process HTML files
      },
      {
        test: /\.css$/i, // Regular expression to match .css files
        use: ['style-loader', 'css-loader'], // Use these loaders to handle CSS files
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "popup.html", // Output filename for popup
      template: "src/popup.html", // Template source
      chunks: ["popup"], // Include only the popup bundle
    }),
    new HtmlWebpackPlugin({
      filename: "learn.html", // Output filename for popup
      template: "src/learn.html", // Template source
      chunks: ["learn"], // Include only the popup bundle
    }),
     new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' }, // copies assets from src to dist
      ],
    }),
  ],

  resolve: {
    extensions: [".ts", ".js"],
  },
};
