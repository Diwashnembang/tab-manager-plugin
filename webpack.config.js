const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "production",
  entry: {
    background: "./src/background.ts",
    content: "./src/content.ts",
    popup: "./src/popup.ts",
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "popup.html", // Output filename for popup
      template: "src/popup.html", // Template source
      chunks: ["popup"], // Include only the popup bundle
    }),
  ],

  resolve: {
    extensions: [".ts", ".js"],
  },
};
