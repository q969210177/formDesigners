/* eslint-disable no-unused-vars */
//验证option
export const validatorOption = option => {
  getDataType(option)
}

//获取原始数据类型
export const getDataType = data => {
  const typeString = Object.prototype.toString.call(data).slice(8, -1)
  return typeString
}
//设置一个动态id
export const setCompoentId = () => {
  const randomLength = Math.ceil(Math.random() * 36)
  const index = Math.ceil(Math.random() * 5)
  return Number(Math.random().toString().substring(index, randomLength) + Date.now()).toString(36)
}
//返回初始默认值
export const returnDefaultData = type => {
  const typeObj = {
    Object: {},
    Undefined: undefined,
    Array: [],
    String: '',
    Number: 1,
    Boolean: false
  }
  if (typeObj[type]) {
    return typeObj[type]
  }
  return console.error('returnDefaultData 方法报错了')
}
//根据 filedId 查询rule的数据
export const getRuleItem = (rule, fileId, returnKey) => {
  const ruleType = getDataType(rule)
  const returnObj = {}
  if (ruleType === 'Array') {
    for (let index = 0; index < rule.length; index++) {
      const item = rule[index]
      if (item.fileId === fileId) {
        returnObj.index = index
        returnObj.ruleItem = item
        return returnObj
      }
    }
  }
}

//根据配置的value 给表单的子项赋值
export const setRuleItem = (ruleItem, ruleKey, value, ruleItemKey) => {
  //当需要给ruleItem 里面的子项赋值的情况
  if (ruleItemKey) {
    ruleItem[ruleKey][ruleItemKey] = value
  } else {
    ruleItem[ruleKey] = value
  }
  return ruleItem
}
// 获取表单子项的值
export const getRuleItemValue = (ruleItem, ruleKey, ruleItemKey) => {
  //当需要给ruleItem 里面的子项赋值的情况
  if (ruleItemKey) {
    return ruleItem[ruleKey][ruleItemKey]
  } else {
    return ruleItem[ruleKey]
  }
}

//抛出事件队列
export const returnEvent = ($listeners, fileId) => {
  const ruleType = getDataType($listeners)
  if (ruleType !== 'Object') return
  const newEvent = {}
  for (const key in $listeners) {
    if (Object.hasOwnProperty.call($listeners, key)) {
      const element = $listeners[key]
      if (key.includes(fileId)) {
        const eventName = key.split('-')
        newEvent[eventName[eventName.length - 1]] = element
        // return newEvent;
      }
    }
  }

  return newEvent
}
//判断传入的默认值
export const isHaveDefaultValue = (judgmentForm, judgmentKey, defaultValue) => {
  if (!judgmentForm) return defaultValue
  //当有默认值的时候
  if (judgmentForm[judgmentKey]) {
    return judgmentForm[judgmentKey]
  } else {
    //当传入的对象 不存在这个key的时候
    return defaultValue
  }
}
//获取字体的长度
export function getWordsWidth(words, wordStyle = {font: '12px sans-serif'}) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.font = wordStyle.font
    return ctx.measureText(words).width
  }
  return 100
}
//分发插槽
// {...this.$slots[i.fileId]}
export function returnSlots($slots, fileId) {
  if (getDataType($slots) !== 'Object') return
  if ($slots[fileId]) {
    return $slots[fileId]
  }
}
