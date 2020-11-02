const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [
  {
    target: "node",
    mode: "development",
    entry: {
      app: ["./src/app.js", "./src/app.less"],
    },
    experiments: {
      outputModule: true,
    },
    output: {
      module: true,
      iife: false,
      filename: "[name].js",
      chunkLoading: "require",
      path: __dirname + "/build_test",
    },
    devtool: false,
    module: {
      rules: [
        {
          test: /\.[j|t]s$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      chrome: "58",
                    },
                    useBuiltIns: false,
                  },
                ],
                "@babel/preset-typescript",
              ],
            },
          },
        },
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".wasm", ".mjs", ".js", ".json", ".ts"],
    },
    optimization: {
      minimize: false,
      usedExports: true,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].acss",
      }),
    ],
  },
];
