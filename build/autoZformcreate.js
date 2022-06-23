var shell = require("shelljs");
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const page = require("../package.json");
const newVersion = page.version.split(".");
if (newVersion[2] === 9) {
  newVersion[1] = Number(newVersion[1]) + 1 + "";
} else if (newVersion[1] === 9) {
  newVersion[0] = Number(newVersion[0]) + 1 + "";
} else {
  newVersion[2] = Number(newVersion[2]) + 1 + "";
}
const newPackage = {
  name: "zformcreate",
  version: newVersion.join("."),
  description: "根据特地规则生成表单",
  main: "index.js",
  files: ["index.js"],
  typings: "index.d.ts",
  keywords: ["form", "vue", "antd"],
  license: "MIT",
  peerDependencies: {
    vue: "^2.5.17",
    "ant-design-vue": "^1.7.8",
    "core-js": "^3.6.5",
  },
};
fs.writeFile(
  path.resolve(__dirname, "../lib/zformcreate/package.json"),
  `
  {
    "name":"zformcreate",
    "version":"${newVersion.join(".")}",
    "description":"根据特地规则生成表单",
    "main":"index.js",
    "files":["index.js","index.d.ts"],
    "typings":"index.d.ts",
    "keywords":["form","vue","antd"],
    "license":"MIT",
    "peerDependencies":{
        "vue":"^2.5.17",
        "ant-design-vue":"^1.7.8",
        "core-js":"^3.6.5"
    }
  }
  `,
  () => {
    console.log("运行完毕");
  }
);

fs.writeFile(
  path.resolve(__dirname, "../lib/zformcreate/index.d.ts"),
  `
  import Vue, { VNode } from "vue";
  export declare class ElementUIComponent extends Vue {
    static install(vue: typeof Vue): void;
    static components(components: VNode): void;
  }
  `,
  () => {
    console.log("运行完毕");
  }
);
//  ./${path.resolve(__dirname, "")}
shell.exec(`
  cd ./lib/zformcreate/
  ls -l
  npm publish
`);
// shell.exec(`ls -l`);
