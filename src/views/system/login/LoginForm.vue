<template>
  <div class="login-wrapper">
    <div class="login-header">
      <img src="" />
    </div>
    <div class="login-body">
      <div class="login-form">
        <div class="h-main-form clearfix">
          <el-form :model="loginForm" label-width="auto" style="max-width: 600px; width: 290px;">
            <div class="login-form-wrapper">
              <el-form-item prop="userNo">
                <el-input name="userNo" type="text" v-model="loginForm.userNo" autocomplete="on" placeholder="请填写用户号"
                  ref='username1' :lengthByByte="true" :byteNum='2' :maxlength="12">
                  <template #prepend>
                    <el-icon>
                      <User />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="_passwd">
                <el-input name="_passwd" type="password" v-model="loginForm._passwd" autocomplete="on" placeholder="请填写用户密码"
                  ref='username' @keyup.enter.native="handleLogin" show-password>
                  <template #prepend>
                    <el-icon>
                      <Lock />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="verificationCode" class="login-smsCode" v-if="verificationCodeFlag">
                <el-input name="verificationCode" style="width:147px" v-model="loginForm.verificationCode"
                  autocomplete="on" placeholder="请填写图形验证码"
                  @keyup.enter.native="handleLogin">
                  <template #prepend>
                    <el-icon><CircleCheck /></el-icon>
                  </template>
                </el-input>
                <div class="login-smsCodePass">
                  <CodeIdentify @click="renew"  v-if="renewCode" style="width: 84px;height: 32px;" ref="verificationCode"></CodeIdentify>
                </div>
              </el-form-item>
              <SliderIdentify></SliderIdentify>
            </div>
            <div class="form-item-submit">
              <el-form-item style="margin-bottom: 0">
                <el-button type="primary" style="width:100%;" :loading="loading"
                  @click.native.prevent="handleLogin">登录</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { nextTick, reactive, ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { User, Lock, CircleCheck } from '@element-plus/icons-vue'
import { inject } from 'vue';

import CodeIdentify from '@/components/Verification/CodeIdentify.vue';
import SliderIdentify from '@/components/Verification/SliderIdentify.vue';

const tt = inject('$tMsgbox')

const obj = {
  contentTitle: '封装函数',
  contentBody: '封装函数内容体',
  onEnsure: () => {
    handleDel()
  }
}

const handleDel = () => {
  console.log('handleDel')
}

// console.log("$tMsgbox.info():", tt.confirm(obj))

const loading = ref(false)

const loginForm = reactive({
  userNo: '',
  _passwd: '',
  verificationCode: ''
})
const verificationCodeFlag = true
let renewCode = ref(true)
const verificationCode = ref(null)

const userStore = useUserStore()

const renew = () => {
  verificationCode.value.initCheckCode()
}

const handleLogin = async () => {
  try {
    console.log('submit!')
    const userInfo = await userStore.login({
      username: 'admin',
      password: '123456',
      type: 'passwd',
    })  
      
  } catch (error) {
    
  } finally {
    loading.value = false
  }

}
</script>

<style>

</style>