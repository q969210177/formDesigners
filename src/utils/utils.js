const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object Array]";
const objectTag = "[object Object]";
const argsTag = "[object Arguments]";

const boolTag = "[object Boolean]";
const dateTag = "[object Date]";
const numberTag = "[object Number]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";
const errorTag = "[object Error]";
const regexpTag = "[object RegExp]";
const funcTag = "[object Function]";

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}

function isObject(target) {
  const type = typeof target;
  return target !== null && (type === "object" || type === "function");
}

function getType(target) {
  return Object.prototype.toString.call(target);
}

function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

function cloneSymbol(targe) {
  return Object(Symbol.prototype.valueOf.call(targe));
}

function cloneReg(targe) {
  const reFlags = /\w*$/;
  const result = new targe.constructor(targe.source, reFlags.exec(targe));
  result.lastIndex = targe.lastIndex;
  return result;
}

function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      if (param) {
        const paramArr = param[0].split(",");
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}

function cloneOtherType(targe, type) {
  const Ctor = targe.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(targe);
    case regexpTag:
      return cloneReg(targe);
    case symbolTag:
      return cloneSymbol(targe);
    case funcTag:
      return cloneFunction(targe);
    default:
      return null;
  }
}

export function clone(target, map = new WeakMap()) {
  // ??????????????????
  if (!isObject(target)) {
    return target;
  }

  // ?????????
  const type = getType(target);
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target, type);
  } else {
    return cloneOtherType(target, type);
  }

  // ??????????????????
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);

  // ??????set
  if (type === setTag) {
    target.forEach((value) => {
      cloneTarget.add(clone(value, map));
    });
    return cloneTarget;
  }

  // ??????map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value, map));
    });
    return cloneTarget;
  }

  // ?????????????????????
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneTarget[key] = clone(target[key], map);
  });

  return cloneTarget;
}

//??????option
export const validatorOption = (option) => {
  getDataType(option);
};

//????????????????????????
export const getDataType = (data) => {
  const typeString = Object.prototype.toString.call(data).slice(8, -1);
  return typeString;
};
//??????????????????id
export const setCompoentId = () => {
  const randomLength = Math.ceil(Math.random() * 7200).toString(16);
  return Date.now().toString(36) + randomLength;
};
//?????????????????????
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
  return console.error("returnDefaultData ???????????????");
};
//?????? filedId ??????rule?????????
export const getRuleItem = (rule, fileId) => {
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

//???????????????value ????????????????????????
export const setRuleItem = (ruleItem, ruleKey, value, ruleItemKey) => {
  //????????????ruleItem ??????????????????????????????
  if (ruleItemKey) {
    ruleItem[ruleKey][ruleItemKey] = value;
  } else {
    ruleItem[ruleKey] = value;
  }
  return ruleItem;
};
// ????????????????????????
export const getRuleItemValue = (ruleItem, ruleKey, ruleItemKey) => {
  //????????????ruleItem ??????????????????????????????
  if (ruleItemKey) {
    return ruleItem[ruleKey][ruleItemKey];
  } else {
    return ruleItem[ruleKey];
  }
};

//??????????????????
export const returnEvent = ($listeners, fileId) => {
  const ruleType = getDataType($listeners);
  if (ruleType !== "Object") return;
  const newEvent = {};
  for (const key in $listeners) {
    if (Object.hasOwnProperty.call($listeners, key)) {
      const element = $listeners[key];
      if (key.includes(fileId)) {
        const eventName = key.split("-");
        newEvent[eventName[eventName.length - 1]] = element;
        // return newEvent;
      }
    }
  }
  return newEvent;
};
//????????????????????????
export const isHaveDefaultValue = (judgmentForm, judgmentKey, defaultValue) => {
  if (!judgmentForm) return defaultValue;
  //????????????????????????
  if (judgmentForm[judgmentKey]) {
    return judgmentForm[judgmentKey];
  } else {
    //?????????????????? ???????????????key?????????
    return defaultValue;
  }
};
//?????????????????????
export function getWordsWidth(words, wordStyle = { font: "12px sans-serif" }) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.font = wordStyle.font;
    return ctx.measureText(words).width;
  }
  return 100;
}
//????????????
export function returnSlots($slots, fileId) {
  if (getDataType($slots) !== "Object") return false;
  if ($slots[fileId]) {
    return true;
  }
  return false;
}

//???tree????????????????????????
export function handleTreeDataSlot(treeData, childrenKey = "children") {
  if (getDataType(treeData) !== "Array")
    throw "handleTreeDataSlot?????????tree ???????????????array??????";
  const scopedSlots = {
    title: "title",
  };
  const setLevel = (array, level = 0) => {
    level++;
    return array.map((v) => {
      v.level = level;
      v.scopedSlots = scopedSlots;
      const child = v[childrenKey];
      if (child && child.length) setLevel(child, level);
      return v;
    });
  };
  return setLevel(treeData);
}
