<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-icon size="66">
            <Bell color="#1989fa" />
          </el-icon>
          <div class="text">
            <p class="num">{{ }}</p>
            <p class="name">待收费数据（条）</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-icon size="66">
            <Reading color="#1989fa" />
          </el-icon>
          <div class="text">
            <p class="num">{{ }}</p>
            <p class="name">待收费金额（元）</p>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-icon size="66">
            <FolderAdd color="#1989fa" />
          </el-icon>
          <div class="text">
            <p class="num">{{ }}</p>
            <p class="name">欠费数据（条）</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-icon size="66">
            <KnifeFork color="#1989fa" />
          </el-icon>
          <div class="text">
            <p class="num">{{ }}</p>
            <p class="name">欠费金额（元）</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="12">
        <div class="echarts-item">
          <BinEcharts></BinEcharts>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="echarts-item">
          <ZhuEcharts></ZhuEcharts>
        </div>
      </el-col>
    </el-row>
    
  </div>
</template>

<script setup lang="ts">
import { FolderAdd, KnifeFork, Bell, Reading } from '@element-plus/icons-vue'
import userStore from '../store/modules/userStore';
import { reactive, onMounted } from 'vue'
import { getDashborad } from '../network/user'
import BinEcharts from '../components/echarts/BinEcharts.vue'
import ZhuEcharts from '../components/echarts/ZhuEcharts.vue';
let users = userStore()
console.log(users.token);

let indexData = reactive({})
// {
//   delayFee:{},
//   houseCount:{},
//   monthPay:{},
//   needPay:{}
// }
let getIndexData = async () => {
  let res = await getDashborad()
  // console.log(res.data);
  indexData = res.data.data
  console.log(indexData);
}

onMounted(() => {
  getIndexData()
})
</script>

<style scoped>
.el-row {
  margin-bottom: 10px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #ffffff;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  height: 140px;
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.text {
  margin-left: 16px;
}

.num {
  font-size: 20px;
  line-height: 36px;
}

.name {
  font-size: 14px;
  color: #666;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.echarts-item {
  background-color: #fff;
  padding: 10px;
}
</style>