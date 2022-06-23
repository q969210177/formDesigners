"use strict";

// const postcss = require("postcss");
const fs = require("fs");
const path = require("path");
//直接拿到json
const fontFile = require(path.resolve(
  __dirname,
  "../src/assets/iconFont/iconfont.json"
));
//
const classList = [];
const nodes = fontFile.glyphs;

nodes.forEach((node) => {
  classList.push({
    name: node.name,
    class: `icon-${node.font_class}`,
  });
});
classList.reverse(); // 希望按 css 文件顺序倒序排列
fs.writeFile(
  path.resolve(__dirname, "../src/utils/iconData.js"),
  `export default ${JSON.stringify(classList)}`,
  () => {
    console.log("运行完毕");
  }
);
