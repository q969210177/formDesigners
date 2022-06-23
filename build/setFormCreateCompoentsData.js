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
  const rep = /^[^A-Z]|\.vue|\.jsx/g;
  const key = v.replace(rep, "").toLowerCase();
  fileObj[key] = `${v.replace(/\.vue|\.jsx/g, "")}`.replace("'", "");
  importStr += `import ${v.replace(
    /\.vue|\.jsx/g,
    ""
  )} from "../components/${v}";`;
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
