<template>
  <div class="layout">
    <div class="panel">
      <h-tag @click="msgboxBox('success')" class="tagCard">成功提示框</h-tag>
      <h-tag @click="msgboxBox('failed')" class="tagCard">失败提示框</h-tag>
      <h-tag @click="msgboxBox('confirm')" class="tagCard">确认提示框</h-tag>
      <h-tag @click="msgboxBox('info')" class="tagCard">消息提示框</h-tag>
      <h-tag @click="msgboxBox('no')" class="tagCard">纯文字提示框</h-tag>   
      <p>
        <el-button @click="handleClick">dian</el-button>
      </p>
      <upload 
        :format="['pdf', 'xlsx']" 
        :max-size="1024"
        :on-format-error="handleFormatError" 
        :on-exceeded-size="fileOverSize"
      ></upload>
    </div>
  </div>
</template>

<script setup>
import {inject, onMounted } from 'vue';
import HTag from '@/common/components/HTag/HTag.vue';

import upload from './upload.vue'

const handleFormatError = (file) => {
  $tMsgbox.failed({
    contentTitle: '提示',
    contentBody: '文件格式不正确, 请选择pdf或者xlsx格式'
  })
}

const fileOverSize = (file) => {
  $tMsgbox.failed({
    contentTitle: '提示',
    contentBody: '文件大小不能超过1M'
  })
}

const $tMsgbox = inject('$tMsgbox')
const $modal = inject('$modal')

const handleDel = () => {
  console.log('handleDel')
}

const msgboxBox = (type) => {
  $tMsgbox[type]({
    contentTitle: '批复信息查询失败',
    contentBody: '请先选择核心企业类型',
    onCancel: () => {
      handleDel()
    }
  })
}

const handleClick = () => {
  $modal.open(
    'basicBusiness/views/asyncModal/todo_info',
    '标题12',
    'add',
    {a: 123, b: 456},
    300,
    350,
  )
}

onMounted(() => {
})

</script>

<style lang="scss" scoped>
.tagCard {
  margin: 0 10px;
}

</style>