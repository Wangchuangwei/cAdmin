<!-- 动态配置查询表单 -->
<template>
  <div class="search-panel">
    <renderForm :items="data.itemsConfig" :formConfig="data.formConfig" test="123" style="width: 300px;" :params="data.formItem" v-on:click="handleClick"></renderForm>
    <div>11111111111111111111111111</div>
    <!-- <query-form :value="data.formItem" :items="data.itemsConfig" :formConfig="data.formConfig"></query-form> -->
  </div>
</template>

<script setup lang="jsx">
import { ref } from 'vue'
import queryForm from './queryForm.vue'
import {getOptions} from './test'

import renderForm from './renderForm.jsx'

const data = ref(getOptions())

const handleClick = (e) => {
  console.log('e:', e)
}
</script>

<style lang="scss" scoped>
.search-panel {
  background: #fff;
  padding-top: 17px;
  margin-bottom: 8px;
}

</style>