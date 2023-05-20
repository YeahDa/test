<script lang="ts" setup>
//引入组合式api
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { UserFilled, Lock, Key } from '@element-plus/icons-vue'
import { login, getCaptcha } from '../network/user'
//引入userStore
import userStore from '../store/modules/userStore'
const userS = userStore()
let router = useRouter()
//定义form表单元素
const ruleFormRef = ref<FormInstance>()
//form验证规则
const rules = reactive<FormRules>({
  username: [{ trigger: "blur", required: true, message: '用户名不能为空', }],
  password: [{ trigger: "blur", required: true, message: '密码不能为空', }],
  code: [{ trigger: "blur", required: true, message: '验证码不能为空', }],
})
//定义form表单数据源
let formData = reactive({
  username: "admin",
  password: "admin123",
  code: "",
  uuid: ""
})

//验证码图片
let image = ref("")
//获取验证码
let captcha = async () => {
  let res = await getCaptcha()
  formData.uuid = res.data.uuid
  image.value = `data:image/gif;base64,${res.data.img}`
}

onMounted(() => {
  captcha()
})

//点击登录
const userLogin = async () => {
  let res = await login(formData)
  if (res.data.code == 200) {
    ElMessage({
      message: '登录成功',
      type: 'success',
    })
    localStorage.setItem("_token", res.data.token)
    userS.saveToken(res.data.token)
    router.replace({ path: '/' })
  } if (res.data.code == 500) {
    ElMessage({
      message: res.data.msg,
      type: 'error',
    })
    captcha()
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login">
      <h3 class="login-title">肇新智慧物业管理系统</h3>
      <el-form ref="ruleFormRef" :model="formData" status-icon :rules="rules" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="formData.username" type="text" autocomplete="off" :prefix-icon="UserFilled" size="large" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formData.password" type="password" autocomplete="off" :prefix-icon="Lock" size="large" />
        </el-form-item>
        <el-form-item prop="code" class="captcha">
          <el-input v-model="formData.code" type="text" :prefix-icon="Key" size="large" style="width: 67%;" />
          <img :src="image" alt="" class="captchaImg">
        </el-form-item>
        <el-form-item>
          <el-checkbox>记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="userLogin" class="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  background-color: #d2d2d2;
  width: 100%;
  height: 100%;
}

.login {
  width: 400px;
  height: 380px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  margin: auto;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 20px;
  box-sizing: border-box;
}

.captchaImg {
  height: 38px;
  margin-left: 13px;
}

.login-title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-btn {
  width: 100%;
}
</style>