const fs = require("fs");
const path = require("path");
let fileObj = {};
let importStr = "";
const jsonStringify = /\'|\"/g;
const fileArr = fs.readdirSync(
  path.resolve(__dirname, "../zformcreate/components"),
  {
    encoding: "utf8",
  }
);
fileArr.forEach((v) => {
  //mac会有一个这个文件 得排除
  if (v === ".DS_Store") return;
  const rep = /^[^A-Z]|\.vue|\.jsx/g;
  const key = v.replace(rep, "").toLowerCase();
  fileObj[key] = `${v.replace(/\.vue|\.jsx/g, "")}`.replace("'", "");
  console.log(v, "v");
  importStr += `import ${v.replace(
    /\.vue|\.jsx/g,
    ""
  )} from "../components/${v}";\n`;
});
fs.writeFile(
  path.resolve(__dirname, "../zformcreate/data/compoents.js"),
  `
    ${importStr};
    export const componentsObj = ${JSON.stringify(fileObj).replace(
      jsonStringify,
      ""
    )};
    `,
  () => {
    console.log("运行完毕");
  }
);
