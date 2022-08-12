import Vue from 'vue'
import axios from 'axios'
import store from 'store'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  //发送请求之前做一些事情
  return config;
}, function (error) {
  //捕捉错，对错误进行处理
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  //对响应结果做一些处理
  /*
  　　　　if(data.code===200){
  　　　　　　return data.data
  　　　　}else{
  　　　　　return response　
  　　　　}
  　　*/
  return response;
}, function (error) {
  return Promise.reject(error);
});
//为axios起一个别名
Vue.prototype.$http = axios;
