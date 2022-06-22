"use strict";
const path = require("path");
// const autoprefixer = require('autoprefixer')
// const pxtorem = require('postcss-pxtorem')

function resolve(dir) {
  console.log(path.join(__dirname, dir), "111");
  return path.join(__dirname, dir);
}
// const Version = new Date().getTime();
module.exports = {
  publicPath: "./",
  // 多页面入口配置pages
  // pages: {
  //   index: {
  //     // page 的入口
  //     entry: "zformcreate/main.js",
  //     // 模板来源
  //     template: "zformcreate/index.html",
  //     // 在 dist/index.html 的输出
  //     filename: "index.html",
  //     // 当使用 title 选项时，
  //     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  //     title: "index",
  //     // 在这个页面中包含的块，默认情况下会包含
  //     // 提取出来的通用 chunk 和 vendor chunk。
  //     chunks: ["chunk-vendors", "chunk-common", "index"],
  //   },
  // },
  outputDir: "ccc",
  configureWebpack: {
    output: {
      libraryExport: "default",
      // filename: "js/[name].[chunkhash]." + Version + ".js",
    },
  },
  devServer: {
    port: 9000,
    proxy: {
      "/api/": {
        target: "http://localhost:3000/",
      },
    },
  },
  chainWebpack() {
    //修改htmlWebpackPlugin
  },
};
