// entry: "index.js",
module.exports = {
  outputDir: "ccc",
  configureWebpack: {
    output: { libraryExport: "default" },
  },
  chainWebpack(config) {
    //修改htmlWebpackPlugin
    config.plugin("html").tap((args) => {
      args[0].title = "表单配置器";
      return args;
    });
  },
  //   output: {
  //     libraryExport: "default",
  //     entry: "./index.js",
  //     filename: "index.js",
  //   },
};
