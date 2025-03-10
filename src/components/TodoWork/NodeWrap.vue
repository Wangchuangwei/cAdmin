<template>
  <div class="pdf-viewer">
    <!-- type:  0 起始节点,1:审批人节点,2:条件,3:路由 -->
     <div class="node-wrap" v-if="nodeConfig.type < 2">
      <div class="node-wrap-box">
        <div class="title" style="background: rgb(73, 195, 136);">
          <span v-if="nodeConfig.type === 0">开始</span>
          <template v-else>
            <span>{{showNodeName}}</span>
            <i class="iconfont icon-close" @click="deleteNode"></i>
          </template>
        </div>
        <div class="content" @click="setPerson">
          <div class="text">
            <div class="node-words">{{showText}}</div>
          </div>
          <i class="iconfont icon-gengduo" v-if="nodeConfig.type === 1"></i>
        </div>
      </div>
      <add-node></add-node>
     </div>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue'

import addNode from './AddNode.vue'

const props = defineProps({
  nodeConfig: {
    type: Object,
    default: () => {}
  },
  type: {
    type: String,
    default: 'add'
  },
})

const setPerson = () => {
  console.log('设置审批人')
}

const deleteNode = () => {
  console.log('删除节点')
}

const setApproverStr = (nodeConfig) => {
  let oType="";
  let nameList = nodeConfig.assigneeNameList;
  if(nodeConfig.approverType!==""){
    if(nodeConfig.approverType=="2"){
      oType = "审批角色：";
    }else if(nodeConfig.approverType=="3"){
      oType = "审批人员：";
    }else if(nodeConfig.approverType=="1") {
      oType = "审批岗位：";
    }
    return oType + nameList.join("、")
  }else{
    return "添加审批人"
  }
}

const showNodeName = computed(() => {
  let nodeName = props.nodeConfig.nodeName
  return nodeName ? '复核-' + nodeName : '复核'
})

const showText = computed(() => {
  return props.nodeConfig.type === 0 ? "经办发起" : setApproverStr(props.nodeConfig)
})
</script>

<style lang="scss" scoped>
.node-wrap {
  display: inline-flex;
  width: 100%;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  padding: 0 50px;
  position: relative;

  .node-wrap-box {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    position: relative;
    width: 232px;
    min-height: 82px;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    background: #fff;
    border-radius: 8px;
    cursor: pointer;
    -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .15);
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .15);

    .title {
      height: 32px;
      line-height: 32px;
      border-radius: 8px 8px 0 0;
      font-size: 14px;
      color: #fff;
      padding: 0 0 0 12px;
      font-weight: 400;
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .content {
      padding: 7px 37px 7px 12px;
      font-size: 12px;
      color: rgba(0, 0, 0, .65);
      height: 50px;
      position: relative;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;

      .text {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
        white-space: pre-line;
        align-self: center;
      }

      .icon-gengduo {
        position: absolute;
        right: 10px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        margin-top: -4px;
        font-size: 16px;
        color: rgba(0, 0, 0, .45);
      }
    }
  }
}

</style>