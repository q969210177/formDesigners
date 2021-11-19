import Vue from "vue";
import {
  DatePicker,
  Input,
  FormModel,
  Row,
  Col,
  Select,
  Card,
} from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
const componentsArr = [DatePicker, Input, FormModel, Row, Col, Select, Card];
componentsArr.forEach((i) => {
  Vue.use(i);
});
// Vue.use(DatePicker);
// Vue.use(Input);
