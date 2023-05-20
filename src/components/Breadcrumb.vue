<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in tabs" :to="item.path">{{ item.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch, Ref } from 'vue';
import { useRoute, RouteLocationMatched } from 'vue-router'
const route = useRoute()
//    定义导航数据,设置类型，否则赋值会报错
const tabs: Ref<RouteLocationMatched[]> = ref([])

const getBreadCom = () => {
  let mached = route.matched.filter(item => item.meta.title)
  // console.log(route.matched, mached)
  // 第一个路径如果不是首页，需要在匹配路径前面拼接一个首页
  const first = mached[0]
  // console.log(mached);
  
  if (first.path != "/index") {
    mached = [{ path: '/index', meta: { title: '首页' } } as any].concat(mached)
  } 
  //设置面包屑的数据
  tabs.value = mached
}

getBreadCom()
// 监听路径的改变,如果发生变化了，执行方法
watch(() => route.path, () => getBreadCom())

</script>

<style scoped></style>