// entry: "index.js",
module.exports = {
  outputDir: "ccc",
  publicPath: "./",
  configureWebpack: {
    output: { libraryExport: "default" },
  },
  chainWebpack() {
    //修改htmlWebpackPlugin
  },
  //   output: {
  //     libraryExport: "default",
  //     entry: "./index.js",
  //     filename: "index.js",
  //   },
  /**  config.plugin("html").tap((args) => {
      args[0].title = "表单配置器";
      return args;
    }); */
};