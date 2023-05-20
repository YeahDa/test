//使用pinia创建一个user模块
import { defineStore } from 'pinia'

let userStore = defineStore("user", {
  //定义数据源
  state: () => ({
    token:""
  }),
  //执行修改状态
  actions: {
    saveToken(args:string){
      this.token=args
    }
  },
  //计算属性
  getters: {

  }
})
export default userStore