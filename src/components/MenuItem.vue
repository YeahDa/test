<template>
  <template v-for="(item, index) in children" :key="index">
    <template v-if="!item.children">
      <el-menu-item :index="`/${item.path}`" @click="toRouter(item)">{{ item.meta.title }}</el-menu-item>
    </template>
    <template v-else>
          <!-- 当前级是否存在子集 -->
    <el-sub-menu :index="`/${item.path}`" @click="toRouter(item)">
      <template #title>{{ item.meta.title }}</template>
      <MenuItem :children="item.children"></MenuItem>
    </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">

interface propType {
  children: Array<any>
}
defineProps<propType>()

let toRouter = (route:any)=>{
  // console.log(route.meta);
}
</script>

<style scoped>
</style>