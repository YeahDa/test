//引入接口
import { getRoutes } from '../network/user'
import Notfound from "../views/Not-found.vue"
//配置项目路由
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

//使用vite懒加载
let module = import.meta.glob("@/views/**/*.vue")

//创建路由实例
const router = createRouter({
  history: createWebHistory("/admin"),
  routes,//路由配置项
  //配置滚动行为
  scrollBehavior(to, from, savedPosition) {
    //回到之前路由组件的滚动位置
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 }; //vue3 返回值存在变化
  }
})

let whiteList = ["/login", "/notfound"] //白名单
let Menu: any[] //菜单
//路由守卫
router.beforeEach(async (to, from) => {
  let token = localStorage.getItem("_token")
  //未登录
  if (!token) {
    if (whiteList.indexOf(to.path) == -1) {
      return { path: "/login" }
    }
  } else { //已登录
    if (to.path == "/login") {
      return { path: "/" }
    }
    //能检测到登录完成
    if (!Menu) {
      //获取菜单数据
      let res = await getRoutes()
      //解析Menu
      Menu = res.data.data
      localStorage.setItem("_menu",JSON.stringify(Menu)) //设置菜单数据缓存
      // console.log(Menu);
      PatterMenu(Menu)
      //手动添加404相关处理
      router.addRoute({
        path: "/notfound",
        component: Notfound
      })
      router.addRoute({
        path: "/:pathMatch(.*)*",
        redirect: "/notfound"
      })
      //处理
      return { path: to.path }
    }
  }
  // console.log(router.getRoutes());
})

//封装方法 递归解析菜单,解析之后返回数组
function PatterMenu(arr: Array<any>) {
  if (!arr.length) {
    return;
  }
  arr.forEach((item) => {
    //定义对象
    let rts = {
      name: item.name,
      path: `/${item.path}`,
      meta: item.meta,
      component: item.component
    }
    //如果存在子集进行递归解析
    if (item.children && item.children.length) {
      PatterMenu(item.children)
    }
    //如果没有子集 证明为路由层
    if (!item.children) {
      // console.log(item.component);
      //实现组件懒加载
      let paths = loadComponent(item.component)
      // console.log(paths);
      rts.component = paths
      // console.log(rts);
      //添加动态路由
      router.addRoute('admin', rts)
      //检测动态路由
      // console.log(router.getRoutes());
    }
  })
}

//懒加载组件
function loadComponent(url: string) {
  let path = module[`/src/views/${url}.vue`]
  return path
}
export default router