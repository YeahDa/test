import { post,get } from "../utils/request";

//用户登录
export const login = (data:any)=>{
  return post("/login",data)
}

//验证码接口
export const getCaptcha=() => {
  return get("/captchaImage",)
}

//用户信息接口
export const userInfo = () => {
  return get('/getInfo')
};

//菜单列表
export const getRoutes = ()=>{
  return get("/getRouters")
}

//商铺管理列表
export const shangpuList = (data:any) => {
  return get("/baseconfig/House",data)
}

//事业数据
export const getDashborad = ()=>{
  return get("/statistics/dashboard")
}