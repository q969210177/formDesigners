const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  mode: "production",
  entry: {
    app: [path.resolve(__dirname, "../zformDesigners/index.js")],
  },
  output: {
    path: path.resolve(process.cwd(), "./lib/zFormDesigners"),
    publicPath: "./",
    filename: "index.js",
    libraryTarget: "umd",
    libraryExport: "default",
  },
  resolve: {
    extensions: [".js", ".vue", ".json", "scss", "woff2", "css", "tff"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "~@": path.resolve(__dirname, "../src"),
    },
  },
  externals: {
    vue: {
      root: "Vue",
      commonjs: "vue",
      commonjs2: "vue",
      amd: "vue",
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: /node_modules|utils\/popper\.js|utils\/date\.js/,
        loader: "babel-loader",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        // test: /\.s[ac]ss$/i,
        test: /\.scss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          MiniCssExtractPlugin.loader,
          // 将 CSS 转化成 CommonJS 模块
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          // 将 Sass 编译成 CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
        ],
      },
      {
        test: /\.(tff|woff2?|woff)$/,
        loader: "file-loader",
        options: {
          outputPath: "assets",
        },
        // use: ["file-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  stats: {
    children: false,
  },
  performance: {
    hints: false,
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "./index.css",
    }),
    new CleanWebpackPlugin(),
  ],
};
// module.exports = {
//   mode: "production",

//   output: {
//     path: path.resolve(process.cwd(), "./lib/zFormDesigners"),
//     publicPath: "/",
//     filename: "index.js",
// chunkFilename: "[id].js",
//     libraryExport: "default",
//     library: "chen",
//     umdNamedDefine: true,
//     globalObject: "typeof self !== 'undefined' ? self : this",
//   },

//     rules: [

//     ],
//   },

// };
