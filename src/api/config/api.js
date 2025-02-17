import axios from "axios";
import config from "./_api_config.js";
import { useUserStore } from '@/store/modules/user'

const httpFetch = axios.create(config)
// const userStore = useUserStore()

// request拦截器
httpFetch.interceptors.request.use(
  (config) => {
    console.log('请求拦截器')
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response 拦截器
httpFetch.interceptors.response.use(
  (response) => {
    console.log('响应拦截器', response)

    if (response.data.respType === "N") {
      // userStore.logout()
    }


    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpFetch;