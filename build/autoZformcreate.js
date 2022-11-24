var shell = require("shelljs");
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const page = require("../package.json");

const newVersion = page.dependencies.zformcreate.split(".");
newVersion[2] = Number(newVersion[2]) + 1 + "";
async function writeFilePackage() {
  await fs.writeFile(
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
    async () => {
      await console.log("运行完毕 writeFilePackage");
    }
  );
}
async function writeFileType() {
  await fs.writeFile(
    path.resolve(__dirname, "../lib/zformcreate/index.d.ts"),
    `
  import Vue, { VNode } from "vue";
  export declare class zformcreate extends Vue {
    static install(vue: typeof Vue): void;
    static components(components: VNode): void;
  }
  `,
    async () => {
      await console.log("运行完毕 writeFileType");
      // shell.exec(`
      // cd ./lib/zformcreate/;
      // npm publish
      // cd ../
      // cd ../
      // ls -l;
      // `);
    }
  );
}
async function main() {
  await writeFilePackage();
  await writeFileType();
}
main();

// shell.exec(`npm publish`);
