/* eslint-disable no-unused-vars */
//验证option
export const validatorOption = (option) => {
  getDataType(option);
};

//获取原始数据类型
export const getDataType = (data) => {
  const typeString = Object.prototype.toString.call(data).slice(8, -1);
  return typeString;
};
//设置一个动态id
export const setCompoentId = () => {
  const randomLength = Math.ceil(Math.random() * 36);
  const index = Math.ceil(Math.random() * 5);
  return Number(
    Math.random().toString().substring(index, randomLength) + Date.now()
  ).toString(36);
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
//根据 filedId 查询rule的数据
export const getRuleItem = (rule, fileId, returnKey) => {
  const ruleType = getDataType(rule);
  const returnObj = {};
  if (ruleType === "Array") {
    for (let index = 0; index < rule.length; index++) {
      const item = rule[index];
      if (item.fileId === fileId) {
        returnObj.index = index;
        returnObj.ruleItem = item;
        return returnObj;
      }
    }
  }
};

//根据配置的value 给表单的子项赋值
export const setRuleItem = (ruleItem, ruleKey, value, ruleItemKey) => {
  //当需要给ruleItem 里面的子项赋值的情况
  if (ruleItemKey) {
    ruleItem[ruleItemKey][ruleKey] = value;
  } else {
    ruleItem[ruleKey] = value;
  }
  console.log(ruleItem);
  return ruleItem;
};
