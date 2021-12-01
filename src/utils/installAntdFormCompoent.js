/* eslint-disable no-unused-vars */
import Vue from "vue";
import {
  DatePicker,
  Input,
  FormModel,
  Row,
  Col,
  Select,
  Card,
  Button,
  Switch,
} from "ant-design-vue";
// import * as Antd from "ant-design-vue";
// console.log(Select);
import "ant-design-vue/dist/antd.css";
const componentsArr = [
  DatePicker,
  Input,
  FormModel,
  Row,
  Col,
  Select,
  Card,
  Button,
  Switch,
];
componentsArr.forEach((i) => {
  Vue.use(i);
});
// Vue.use(DatePicker);
// Vue.use(Input);
