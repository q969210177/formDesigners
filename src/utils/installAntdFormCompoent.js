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
  Checkbox,
  Radio,
  Tabs,
  Icon,
  Slider,
  Modal,
  InputNumber,
  message,
  Table,
  Divider,
  Pagination,
  Spin,
  Tree,
  Cascader,
  Alert,
} from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.prototype.$message = message;
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
  Checkbox,
  Radio,
  Tabs,
  Icon,
  Slider,
  Modal,
  InputNumber,
  Table,
  Divider,
  Pagination,
  Spin,
  Tree,
  Cascader,
  Alert,
];
componentsArr.forEach((i) => {
  Vue.use(i);
});
// Vue.use(DatePicker);
// Vue.use(Input);
