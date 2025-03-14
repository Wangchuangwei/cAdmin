export default {
  // 默认请求方法
  method: "get",
  // 请求头信息
  headers: {
    "Content-Type": "application/json",
  },
  // 设置超时时间
  timeout: 500000000,
  // 返回数据类型
  responseType: "json", // default

  // 是否跨站点访问控制请求
  // withCredentials: false, // default
  withCredentials: true, //自动携带cookie

  // 默认parameter参数
  params: {},

  // 默认post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
  data: {},

  maxContentLength: 2000,

  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // 在发送请求之前对请求数据做处理
  transformRequest: [
    function (data) {
      if (data == undefined) {
        data = {}
      }
      console.log("transformRequest", data);
      return data;
    },
  ],

  // 提前处理返回的数据
  transformResoponse: [
    function (data) {
      return data;
    },
  ],
};
