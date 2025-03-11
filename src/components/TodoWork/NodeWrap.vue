<template>
  <div class="pdf-viewer" v-if="showFIlag">
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
      <add-node 
        :childNode="nodeConfig.childNode"
        :type="type"
        @updateChildNode="updateChildNode"
      ></add-node>
    </div>
    <div class="branch-wrap" v-if="nodeConfig.type==3">
      <div class="branch-box-wrap">
        <div class="branch-box">
          <div class="add-branch" @click="addTerm">添加条件</div>
          <div class="col-box" v-for="(item,index) in nodeConfig.conditionNodes" :key="index">
            <div class="condition-node">
							<div class="condition-node-box">
								<div class="auto-judge" >

                </div>
              </div>
            </div>
            <node-wrap
              v-if="item.childNode"
              :nodeConfigs="item.childNode"
              @updateChildNode="updateChildNode"
            ></node-wrap>
            <template v-if="index==0">
							<div class="top-left-cover-line"></div>
							<div class="bottom-left-cover-line"></div>
						</template>
						<template v-if="index==nodeConfig.conditionNodes.length-1">
							<div class="top-right-cover-line"></div>
							<div class="bottom-right-cover-line"></div>
						</template>
          </div>
        </div>
      </div>
    </div>
    <node-wrap
      v-if="nodeConfig.childNode"
      :nodeConfigs="nodeConfig.childNode"
      @updateChildNode="updateChildNode"
    ></node-wrap>
  </div>
</template>

<script setup>
import {ref, computed, nextTick} from 'vue'
import addNode from './AddNode.vue'

const emit = defineEmits(['updateChildNode']) 

const props = defineProps({
  nodeConfigs: {
    type: Object,
    default: () => {}
  },
  type: {
    type: String,
    default: 'add'
  },
})

let showFIlag =ref(true)

const nodeConfig = computed(() => {
  return props.nodeConfigs
})

const setPerson = () => {
  console.log('设置审批人')
}

const deleteNode = () => {
  emit('updateChildNode', nodeConfig.value.childNode)
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
  let nodeName = nodeConfig.value.nodeName
  return nodeName ? '复核-' + nodeName : '复核'
})

const showText = computed(() => {
  return nodeConfig.value.type === 0 ? "经办发起" : setApproverStr(nodeConfig.value)
})

const updateChildNode = (data) => {
  showFIlag.value = false
  // nodeConfig.value.childNode = data

  setTimeout(() => {
    showFIlag.value = true

  }, 1000)
  nextTick(() => {
    nodeConfig.value.childNode = data
    console.log("nodeConfig.value:", nodeConfig.value)
  })
}
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

      .icon-close {
        // display: none;
        background: #eb4954;
        position: absolute;
        right: 13px;
        top: 9px;
        width: 14px;
        height: 14px;
        color: #fff;
        border-radius: 50%;
        text-align: center;
        line-height: 12px;
        font-size: 12px;
        font-style: normal;
      }
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

.branch-wrap {
  display: inline-flex;
  width: 100%;

  .branch-box-wrap {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    min-height: 270px;
    width: 100%;
    -ms-flex-negative: 0;
    flex-shrink: 0;

    .branch-box {
      display: flex;
      overflow: visible;
      min-height: 180px;
      height: auto;
      border-bottom: 2px solid #ccc;
      border-top: 2px solid #ccc;
      position: relative;
      margin-top: 15px;

      .add-branch {
        position: absolute;
        top: -16px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        width: 86px;
        height: 26px;
        line-height: 26px;
        color: rgba(0,0,0,.65);
        font-size: 14px;
        padding: 2px;
        border: 2px solid #bdc0ca;
        border-radius: 13px;
        background: #fff;
        cursor: pointer;
        z-index: 1;
      }

      .col-box {
        display: inline-flex;
        background: #fff;
        align-items: center;
        // justify-content: center;
        flex-direction: column;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          width: 2px;
          height: 100%;
          background-color: #cacaca;
        }

        .condition-node {
          max-height: 220ox;
          display: -webkit-inline-box;
          display: -ms-inline-flexbox;
          display: inline-flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-flex: 1;

          .condition-node-box {
            padding-top: 30px;
            padding-right: 50px;
            padding-left: 50px;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-flex: 1;
            -ms-flex-positive: 1;
            flex-grow: 1;
            position: relative;
            display: -webkit-inline-box;
            display: -ms-inline-flexbox;
            display: inline-flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-box-flex: 1;
            width: 330px;
          }
        }
      }
    }
  }
}

.top-left-cover-line {
  position: absolute;
  height: 8px;
  width: 50%;
  background-color: #fff;
  top: -4px;
  left: -1px;
}
.bottom-left-cover-line {
  position: absolute;
  height: 8px;
  width: 50%;
  background-color: #fff;
  bottom: -4px;
  left: -1px;
}
.top-right-cover-line {
  position: absolute;
  height: 8px;
  width: 50%;
  background-color: #fff;
  top: -4px;
  right: -1px;
}
.bottom-right-cover-line {
  position: absolute;
  height: 8px;
  width: 50%;
  background-color: #fff;
  bottom: -4px;
  right: -1px;

}
</style>