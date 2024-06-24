const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = () => {
  // const envPath = path.resolve(__dirname, "./.env");
  return {
    entry: "./src/index.tsx",
    output: {
      filename: "main.js",
      publicPath: "/",
      path: path.resolve(__dirname, "build")
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: "ts-loader"
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            "file-loader",
            {
              loader: "image-webpack-loader",
              options: {
                bypassOnDebug: true,
                disable: true
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: [".*", ".js", ".jsx", ".ts", ".tsx"]
    },
    devServer: {
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, "build")
      },
      port: 3000, // Port for the development server
      open: true // Open the default web browser when the server starts
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html")
      }),
      new Dotenv()
    ]
  };
};
