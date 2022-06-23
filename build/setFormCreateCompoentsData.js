const fs = require("fs");
const path = require("path");
let fileObj = {};
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
  //   fileObj = `
  //   import ${v.replace(/\.vue|\.jsx/g, "")} from "../components/${v}";
  //   export const componentsObj = {
  //     ${key}: ${v.replace(/\.vue|\.jsx/g, "")},
  //   };
  //   `;
});
