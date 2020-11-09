// 对网络请求框架axios进行封装
import axios from 'axios'

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: '',
    timeout: 5000
  })

  // 2. axios请求拦截器
  instance.interceptors.request.use(config => {
    // 2.1 请求拦截的作用
    //1.比如config中的些信息不符合服务器的要求
    //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
    // 3.某些网络请求(比如登录(token)),必须携带一 些特殊的信息
    return config
  }, err => {
    // console.log(err);
  })
  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    // console.log(err);
  })
  // 3.发送真正的网络请求
  return instance(config)
}
