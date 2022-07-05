var shell = require("shelljs");
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const page = require("../package.json");

const newVersion = page.dependencies["z-form-designers"].split(".");
newVersion[2] = Number(newVersion[2]) + 1 + "";
function writeFilenamePackageJson() {
  fs.writeFile(
    path.resolve(__dirname, "../lib/zFormDesigners/package.json"),
    `
    {
      "name":"z-form-designers",
      "version":"${newVersion.join(".")}",
      "description":"拖拽生成zformcreate的规则",
      "main":"index.js",
      "files":["index.js","index.d.ts","assets","index.css"],
      "typings":"index.d.ts",
      "keywords":["zformcreate","vue","form","antd","drop"],
      "license":"MIT",
      "peerDependencies":{
          "vue":"^2.5.17",
          "ant-design-vue":"^1.7.8",
          "core-js":"^3.6.5"
      }
    }
    `,
    async () => {
      await writeFilenameIndexTs();
      shell.exec(`
      cd ./lib/zFormDesigners/
      ls -l
    `);
      // shell.exec(`npm uninstall z-form-designers`);
      // shell.exec(`npm i z-form-designers -S`);
    }
  );
}
function writeFilenameIndexTs() {
  fs.writeFile(
    path.resolve(__dirname, "../lib/zFormDesigners/index.d.ts"),
    `
    import Vue, { VNode } from "vue";
    export declare class zFormDesigners extends Vue {
      static install(vue: typeof Vue): void;
      static setDefaultFormConfig(newFormConfig: {[x:string]:any}): void;
      static addFormRule(newRule: any[]): void;
      static addCompoentsRule(newRule:any[]): void;
    }
    `,
    () => {
      console.log("运行完毕");
    }
  );
}
writeFilenamePackageJson();
// npm publish
// npm uninstall z-form-designers
// npm install z-form-designers -S
