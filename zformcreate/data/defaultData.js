export let defaultUI = "antd";
export function setDefaultUI(UIName) {
  defaultUI = UIName;
}
export const UIList = ["antd", "el"];

export const a = {
  devDependencies: {
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-eslint": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "@vue/eslint-config-prettier": "^6.0.0",
    "babel-eslint": "^10.1.0",
    "clean-webpack-plugin": "^4.0.0",
    "css-minimizer-webpack-plugin": "^4.0.0",
    eslint: "^6.7.2",
    "eslint-plugin-prettier": "^3.3.1",
    "eslint-plugin-vue": "^6.2.2",
    "file-loader": "^6.2.0",
    "mini-css-extract-plugin": "^0.9.0",
    prettier: "^2.2.1",
    "progress-bar-webpack-plugin": "^1.11.0",
    sass: "^1.26.5",
    "sass-loader": "^8.0.2",
    shelljs: "^0.8.4",
    "style-loader": "^2.0.0",
    "vue-template-compiler": "^2.6.11",
    "webpack-cli": "^4.10.0",
    "webpack-node-externals": "^1.7.2",
  },
};
