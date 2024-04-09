import type { AxiosInstance, InternalAxiosRequestConfig,AxiosResponse } from 'axios';
import axios from 'axios';

const service:AxiosInstance = axios.create({
  baseURL: process.env.APP_HTTP_URL
})

// request 拦截器
service.interceptors.request.use(
    (config:InternalAxiosRequestConfig) => {
      // 在这里可以设置请求头、请求参数等return config
      return config;
    },
    error => {
      console.log(error)
      return Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
      // 在这里处理返回数据
      const { data } = response
      if (data.code !== 200) {
        console.error('Error:', data.message)
        return Promise.reject(new Error(data.message || 'Error'))
      } else {
        return data
      }
    },
    error => {
      console.log(error)
      return Promise.reject(error)
    }
)

// 封装具体的请求方法: 四种请求类型不和下面的3和4标题内容放在一起
export const get = (url: string, params: any) => {
  return service.get(url, { params });
};

export const post = (url: string, data: any) => {
  return service.post(url, data);
};

export const put = (url: string, data: any) => {
  return service.put(url, data);
};

export const del= (url: string, data: any) => {
  return service.delete(url, data);
};

export default service
