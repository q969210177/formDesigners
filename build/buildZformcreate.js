const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    app: [path.resolve(__dirname, "../zformcreate/index.js")],
  },
  output: {
    path: path.resolve(process.cwd(), "./lib/zformcreate"),
    publicPath: "/",
    filename: "index.js",
    chunkFilename: "[id].js",
    libraryTarget: "umd",
    libraryExport: "default",
    library: "chen",
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
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
  performance: {
    hints: false,
  },
  stats: {
    children: false,
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),

        // exclude: config.jsexclude,
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
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          //   "style-loader",
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 Sass 编译成 CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin({}),
  ],
};
