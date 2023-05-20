<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width=asideW>
        <div class="logo">
          <h1 class="title">肇新智慧物业</h1>
        </div>
        <el-menu :collapse="isCollapse" :router=true default-active="/" class="el-menu-vertical-demo" >
          <el-menu-item index="/">
            <template #title>
              <el-icon>
                <location />
              </el-icon>
              <span>首页</span>
            </template>
          </el-menu-item>
          <template v-for="(item) in menu" :key="index">
            <el-sub-menu :index="`/${item.path}`">
              <!-- 一级 -->
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>{{ item.meta.title }}</span>
              </template>
              <!-- 二级 -->
              <MenuItem :children="item.children">
              </MenuItem>
            </el-sub-menu>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <Breadcrumb></Breadcrumb>
          
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {
  Location,
} from '@element-plus/icons-vue'
import MenuItem from '../components/MenuItem.vue'
import { ref } from 'vue'
import Breadcrumb from '../components/Breadcrumb.vue'
let isCollapse = ref(false)
let asideW = ref('220px')
//读取数据缓存
let menu = JSON.parse(localStorage.getItem("_menu")!)

let isShouw = () => {
  isCollapse.value = !isCollapse.value;
  asideW.value = isCollapse.value ? "64px" : "220px";
}
</script>

<style scoped>
*::-webkit-scrollbar {
  width: 0px;
}

.common-layout {
  height: 100%;
}

.el-container {
  height: 100%;
  background-color: aliceblue;
}

.el-aside {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: 100%;
  transition: width 0.15s ease-in-out;
}
.logo {
  background-color: #e9eef3;
}
.title {
  display: inline-block;
  color: #000;
  font-weight: 600;
  line-height: 50px;
  font-size: 18px;
  font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
  vertical-align: middle;
  margin: 0px;
}

.el-menu {
  border: none;
  background-color: #e9eef3;
}

.el-header {
  display: flex;
  align-items: center;
  line-height: 60px;
  background-color: #fff;
}

.el-main {
  color: #333;
}
</style>