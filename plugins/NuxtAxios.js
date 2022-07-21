import Vue from 'vue'
import axios from 'axios'
import store from 'store'
export default ({ redirect, $axios, app }) => {
  $axios.onRequest(config => {
    return new Promise((resolve, reject) => {
      //match api
      let token = localStorage.getItem("token")
      //add token
      if (token) {
        config.headers.Authorization = token;
      }
      //其他的请求前业务逻辑 比如：api map
      resolve(config);
    })
  });

  $axios.onResponse(res => {
    return new Promise((resolve, reject) => {
      //返回数据逻辑处理 比如：error_code错误处理
      resolve(res.data);
    })
  });

  $axios.onError(config => {
    console.log('Making request to ' + config.url)
  })
};
//为axios起一个别名
Vue.prototype.$http = axios;
