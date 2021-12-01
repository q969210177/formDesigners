//验证option
export const validatorOption = (option) => {
  getDataType(option);
};

//获取原始数据类型
export const getDataType = (data) => {
  const typeString = Object.prototype.toString.call(data).slice(8, -1);
  return typeString;
};

//返回初始默认值
export const returnDefaultData = (type) => {
  const typeObj = {
    Object: {},
    Undefined: undefined,
    Array: [],
    String: "",
    Number: 1,
    Boolean: false,
  };
  if (typeObj[type]) {
    return typeObj[type];
  }
  return console.error("returnDefaultData 方法报错了");
};
