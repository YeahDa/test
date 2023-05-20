import Admin from "../views/Admin.vue" //静态二级默认
import Login from "../views/Login.vue"

import Dashbord from "../views/Dashbord.vue" 

export default [
  {
    path: "/",
    component: Admin,
    name:"admin",
    redirect:"/index",
    children:[
      {
        path:"/index",
        component:Dashbord,
        meta:{
          title:'首页'
        }
      }
    ]
  },
  {
    path: "/login",
    component: Login
  }
]