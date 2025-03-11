<template>
  <div class="cAdmin__container">
    <node-wrap :nodeConfigs="nodeConfig" type="add"></node-wrap>
  </div>
</template>

<script setup>
import {ref} from "vue"
import { getAssetURL } from '@/utils/common'
import nodeWrap from "@/components/TodoWork/NodeWrap.vue";

const nodeConfig = {
  type: 0,
  childNode: null,
  // childNode: {
  //   type: 1,
  //   nodeName:"",
  //   approverType:"",
  //   approverNodeType:"1",
  //   assigneeList:[],
  //   childNode: null,
  // }
}

</script>

<style lang="scss" scoped>
.cAdmin__container {
  overflow-y: auto;
  width: 100%;
  max-height: calc(100vh - 92px);
  padding-bottom: 16px;
  background: #fff;
}

</style>