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
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false,
              },
            },
            "css-loader",
            "less-loader",
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false,
              },
            },
            "css-loader",
          ],
        },
      ],
    },
    resolve: {
      extensions: [".wasm", ".mjs", ".js", ".json", ".ts"],
    },
    optimization: {
      minimize: true,
      usedExports: true,
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          exclude: /node_modules/,
        }),
      ],
      runtimeChunk: {
        name: "mini_require",
      },
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          common: {
            name: "common",
            minChunks: 2,
            priority: 1,
          },
          vendors: {
            name: "vendors",
            minChunks: 1,
            test: (module) => {
              return /[\\/]node_modules[\\/]/.test(module.resource);
            },
            priority: 10,
          },
        },
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        name: "[name].acss",
      }),
    ],
  },
];
