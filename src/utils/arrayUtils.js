

/**
 * 深拷贝对象和数组
 * @param {Object} obj
 */
export function  cloneObj(obj) {
  let str, newobj = obj.constructor === Array ? [] : {};
  if (typeof obj !== 'object') {
      return;
  } else {
      for (let i in obj) {
          newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
      }
  }
  return newobj;
}

  /**
   *  @Param  : params--temp-需要转化的数组
   *  @Param  : params--id-子唯一属性
   *  @Param  : params--pid-父唯一属性
   *  @Desc   :数组转化为树形结构
   **/
export function arrayToTree(temp1,id,pid){
    let temp = cloneObj(temp1)
    let hash = {};
    let dataArr = [];
    for (let i = 0; i <temp.length; i++) {
      hash[temp[i][id]] = temp[i];
    }
    for (let i = 0; i < temp.length; i++) {
      let aVal = temp[i];
      let aValPar = hash[aVal[pid]];
      // 第一级父元素
      if(aVal[id]===aVal[pid]||!aValPar){
        dataArr.push(aVal);
      } else {
        if (!aValPar.hasOwnProperty('children')) {
          aValPar['children'] = [];
          aValPar['children'].push(aVal);
        } else {
          aValPar['children'].push(aVal);
        }
      }
    }
    return dataArr;
  }