<template>
  <div class="cAdmin__container">
    <node-wrap :nodeConfig="nodeConfig"></node-wrap>
  </div>
</template>

<script setup>
import {ref} from "vue"
import { getAssetURL } from '@/utils/common'
import nodeWrap from "@/components/TodoWork/NodeWrap.vue";

const nodeConfig = {
  type: 0
}

</script>

<style lang="scss" scoped>
.cAdmin__container {
  overflow-y: auto;
  width: 100%;
  max-height: calc(100vh - 92px);
  padding-bottom: 16px;
}

</style>