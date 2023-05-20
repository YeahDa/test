import axios from "axios";

axios.defaults.baseURL = "http://xawn.f3322.net:8888";
axios.defaults.timeout = 2000
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

//请求拦截器
axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("_token");
    // console.log(token);
    token && (config.headers["Authorization"] = `Bearer ${token}`);
    return config;
  },
  (error) => {
    return Promise.reject(error)
  }
);
//响应拦截器
axios.interceptors.response.use(
  (response)=>{
    return Promise.resolve(response)
  }
)

//封装get
export const get = (url:string,data?:any,type?:any)=>{
  return axios({
    method:'get',
    url:url,
    params:data,
    headers:type
  })
}

//封装post
export const post = (url:string,data?:any,type?:any)=>{
  return axios({
    method:'post',
    url:url,
    data:data,
    headers:type
  })
}
