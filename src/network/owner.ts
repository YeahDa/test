import {post,get} from '../utils/request'

//小程序用户
export const wxUser = (data:any)=>{
  return get("/owner/wxuser/page",data)
}

//业主通知公告
export const ownerNotice = (data:any)=>{
  return get("/owner/ownerNotice/list",data)
}

//业主信息
export const ownerUserInfo = (data:any)=>{
  return get("/owner/ownerUser/list",data)
}

//添加业主
export const addOwner = (data:any)=>{
  return post("/owner/ownerUser",data)
}