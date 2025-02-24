class Storage {
  constructor(name){
    this.name = 'storage';
  }

  //设置缓存
  setItem(params) {
    let obj = {
      name: "",
      value: "",
      expires: "" || (window.LOCAL_CONFIG.STORAGE_TIME*60*1000),//分转换为毫秒：localStorage有效时间
      startTime: new Date().getTime() //记录何时将值存入缓存，毫秒级
    }
    let options = {};
    //将obj和传进来的params合并
    Object.assign(options,obj,params);
    console.log("options:", options)
    if(options.expires){
      //如果options.expires设置了的话
      //以options.name为key，options为值放进去
      sessionStorage.setItem(options.name,JSON.stringify(options));
    }else{
      //如果options.expires没有设置，就判断一下value的类型
      let type = Object.prototype.toString.call(options.value);
      //如果value是对象或者数组对象的类型，就先用JSON.stringify转一下，再存进去
      if(Object.prototype.toString.call(options.value) == '[object Object]'){
        options.value = JSON.stringify(options.value);
      }
      if(Object.prototype.toString.call(options.value) == '[object Array]'){
        options.value = JSON.stringify(options.value);
      }
      sessionStorage.setItem(options.name,options.value);
    }
  }
  //拿到缓存
  getItem(name) {
    let item = sessionStorage.getItem(name);
    //先将拿到的试着进行json转为对象的形式
    try{
      item = JSON.parse(item);
    }catch(error){
      //如果不行就不是json的字符串，就直接返回
      item = item;
    }
    //如果有startTime的值，说明设置了失效时间
    if(item && item.expireTime){
      //获取当前时间戳，与startTime比较，判断是否超时
      let currentTime = new Date().getTime();
      if(item.expireTime < currentTime - item.startTime){
        //如果超时，删除缓存，返回false
        sessionStorage.removeItem(name);
        return false
      }else{
        //如果没有超时，返回对象
        return item.data;
      }
    } else {
      //如果没有设置失效时间，直接返回值
      return item
    }
  }
  //移出缓存
  removeItem(name){
    sessionStorage.removeItem(name);
  }
  //移出全部缓存
  clear(){
    console.log("clear:")
    sessionStorage.clear();
  }
}

export default new Storage();