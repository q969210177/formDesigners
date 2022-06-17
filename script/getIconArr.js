"use strict";

// const postcss = require("postcss");
const fs = require("fs");
const path = require("path");
const fontFile = fs.readFileSync(
  path.resolve(__dirname, "../src/assets/iconFont/iconfont.json"),
  "utf8"
);
const classList = [];
const nodes = JSON.parse(fontFile).glyphs;
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
