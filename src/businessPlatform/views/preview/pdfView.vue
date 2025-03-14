<template>
  <div class="cAdmin__container">
    <div class="c-approval-zoom">
      <div :class="{disabled: nowVal == 50}" @click="zoomSize(1)">-</div>
      <span>{{nowVal}}%</span>
      <div :class="{disabled: nowVal == 300}" @click="zoomSize(2)">+</div>
    </div>
    <div class="box-scale" :style="'transform: scale('+nowVal/100+'); transform-origin: 50% 0px 0px;'">
      <node-wrap :nodeConfigs="nodeConfig" type="add"></node-wrap>
      <div class="end-node">
        <div class="end-node-circle"></div>
        <div class="end-node-text">流程结束</div>
      </div>      
    </div>
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

let nowVal = ref(100)

const zoomSize = (type) => {
  if (type == 1) {
    if (nowVal.value == 50) return;
    nowVal.value -= 10;
  } else {
    if (nowVal.value == 300) return;
    nowVal.value += 10;
  }
}
</script>

<style lang="scss" scoped>
.cAdmin__container {
  overflow-y: auto;
  width: 100%;
  max-height: calc(100vh - 92px);
  padding-bottom: 16px;
  background: #fff;
  position: relative;
  padding-top: 20px;
}
.end-node {
  .end-node-circle {
    width: 56px;
    height: 30px;
    background: url(@/assets/svg/checkmark.svg) no-repeat top;
    margin: auto;
  }
  .end-node-text {
    font-size: 14px;
    color: rgba(0, 0, 0, .25);
    text-align: center;
    margin-top: 6px;
  }
}
.c-approval-zoom {
  display: flex;
  position: absolute;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  height: 40px;
  width: 125px;
  right: 40px;
  font-size: 12px;
  z-index: 10;

  .disabled {
    background: #bdc0ca;;
  }

  & > div {
    width: 26px;
    height: 26px;
    line-height: 26px;
    background: #fff;
    cursor: pointer;
    background-size: 100%;
    background-repeat: no-repeat;
    border: 1px solid #bdc0ca;
    border-radius: 2px;
    text-align: center;
    font-size: 14px;
  }
}
</style>