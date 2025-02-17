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
  }
}

export default new Storage();