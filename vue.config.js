// entry: "index.js",
module.exports = {
  outputDir: "ccc",
  publicPath: "./",
  configureWebpack: {
    output: { libraryExport: "default" },
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
