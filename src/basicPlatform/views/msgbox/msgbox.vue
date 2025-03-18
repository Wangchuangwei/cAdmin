<template>
  <div class="layout">
    <div class="panel">
      <h-tag @click="msgboxBox('success')" class="tagCard">成功提示框</h-tag>
      <h-tag @click="msgboxBox('failed')" class="tagCard">失败提示框</h-tag>
      <h-tag @click="msgboxBox('confirm')" class="tagCard">确认提示框</h-tag>
      <h-tag @click="msgboxBox('info')" class="tagCard">消息提示框</h-tag>
      <h-tag @click="msgboxBox('no')" class="tagCard">纯文字提示框</h-tag>      
    </div>
  </div>
</template>

<script setup>
import {inject, onMounted } from 'vue';
import HTag from '@/common/components/HTag/HTag.vue';

const $tMsgbox = inject('$tMsgbox')

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

onMounted(() => {
})

</script>

<style lang="scss" scoped>
.tagCard {
  margin: 0 10px;
}

</style>