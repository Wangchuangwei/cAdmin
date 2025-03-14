<template>
  <div class="pdf-viewer" v-if="showFIlag">
    <!-- type:  0 起始节点,1:审批人节点,2:条件,3:路由 -->
    <div class="node-wrap" v-if="nodeConfig.type < 2">
      <div class="node-wrap-box">
        <div class="title" style="background: rgb(73, 195, 136);">
          <span v-if="nodeConfig.type === 0">开始</span>
          <template v-else>
            <span>{{showNodeName}}</span>
            <i class="iconfont icon-close" @click="deleteNode" v-if="nodeConfig.approverNodeType == '1'"></i>
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
          <div class="add-branch" @click="addTermNode">添加条件</div>
          <div class="col-box" v-for="(item,index) in nodeConfig.conditionNodes" :key="index">
            <div class="condition-node">
							<div class="condition-node-box">
								<div class="auto-judge" >
									<div class="title-wrapper">
										<span v-if="item.conditionType=='0'">{{showConditionName(item.nodeName)}}</span>
										<span v-if="item.conditionType=='1'">其他条件</span>
                    <i class="iconfont icon-close" @click="deleteTermNode(index)" v-if="item.conditionType == '0'"></i>
									</div>
                  <div class="content">
										<div class="text" v-if="item.conditionType=='0'" :title="conditionStr(nodeConfig, index)">
											<p class="node-words">{{conditionStr(nodeConfig, index)}}</p>
										</div>
										<div class="text" v-else>
											<span>其他条件</span>
										</div>
                  </div>
                </div>
                <add-node 
                  :childNode="item.childNode"
                  :type="type"
                  @updateChildNode="(data) => updateItemChildNode(data, item)"
                ></add-node>
              </div>
            </div>
            <node-wrap
              v-if="item.childNode"
              :nodeConfigs="item.childNode"
              @updateChildNode11="(data) => updateItemChildNode(data, item)"
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
        <add-node 
          :childNode="nodeConfig.childNode"
          :type="type"
          @updateChildNode="updateChildNode"
        ></add-node>
      </div>
    </div>
    <node-wrap
      v-if="nodeConfig.childNode"
      :nodeConfigs="nodeConfig.childNode"
      @updateChildNode11="updateChildNode"
    ></node-wrap>
  </div>
</template>

<script setup>
import {ref, computed, nextTick} from 'vue'
import addNode from './AddNode.vue'

const emit = defineEmits(['updateChildNode11']) 

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
  console.log("curdelte:")
  emit('updateChildNode11', nodeConfig.value.childNode)
}

const conditionStr = (nodeConfig, index) => {
  let data = nodeConfig.conditionNodes[index].conditionList
  let str = ""
  if (data && data.length > 0) {
    data.forEach((item) => {
      // 如果是金额
      if (item.propertyType == "Amt") {
        if (item.propertyMax == "") {
          str += item.propertyName + ": 大于等于" + item.propertyMin + '; \n'
        } else {
          str += item.propertyName + ": " + item.propertyMin + "~" + item.propertyMax + '; \n'
        }
      } else {
        str += item.propertyName + ": " + item.propertyFormulaName + item.propertyValueNameList.join("、") + "; \n"
      }
    })
  } else {
    str = "添加条件"
  }
  return str
}

const reData = (data, addData) => {
  if (!data.childNode) {
    data.childNode = addData
  } else {
    reData(data.childNode, addData)
  }
}

const addTermNode = () => {
  let len = nodeConfig.value.conditionNodes.length
  let addData = {
    type: 2,
    nodeName: "",
    priorityLevel: len,
    conditionType: "0",
    conditionList: [],
    childNode: {
      type: 1,
      nodeName: "",
      approverType: "",
      approverNodeType:"0",
      assigneeList: [],
      childNode: null,
    },
  }
  nodeConfig.value.conditionNodes.splice(len - 1, 0, addData)
  emit('updateChildNode11', nodeConfig.value)
}

const deleteTermNode = (index) => {
  nodeConfig.value.conditionNodes.splice(index, 1)
  nodeConfig.value.conditionNodes.map((item, index) => {
    return item.priorityLevel = index + 1
  })
  emit('updateChildNode11', nodeConfig.value)
  if (nodeConfig.value.conditionNodes.length === 1) {
    if (nodeConfig.value.childNode) {
      if (nodeConfig.value.conditionNodes[0].childNode) {
        reData(nodeConfig.value.conditionNodes[0].childNode, nodeConfig.value.childNode)
      } else {  
        nodeConfig.value.conditionNodes[0].childNode = nodeConfig.value.childNode
        nodeConfig.value.conditionNodes[0].childNode.approverNodeType = "1"
      }
    }
    nodeConfig.value.conditionNodes[0].childNode.approverNodeType = "1"
    emit('updateChildNode11', nodeConfig.value.conditionNodes[0].childNode )
  } 
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

const showConditionName = (name) => {
  return name ? '条件-' + name : '条件' + name
}

const showNodeName = computed(() => {
  let nodeName = nodeConfig.value.nodeName
  return nodeName ? '复核-' + nodeName : '复核'
})

const showText = computed(() => {
  return nodeConfig.value.type === 0 ? "经办发起" : setApproverStr(nodeConfig.value)
})

const updateChildNode = (data) => {
  console.log("data, node:", data, nodeConfig.value)
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

const updateItemChildNode = (data, item) => {
  showFIlag.value = false
  // nodeConfig.value.childNode = data
  item.childNode = data
  setTimeout(() => {
    showFIlag.value = true

  }, 1000)
}
</script>

<style lang="scss" scoped>
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

.auto-judge {
  position: relative;
  width: 232px;
  height: 80px;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
  -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .15);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .15);

  .title-wrapper {
    height: 26px;
    color: #01b7d0;
    font-size: 14px;
    padding: 6px 12px 0;
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
      -ms-flex-item-align: center;
      align-self: center;
      word-break: break-all;
      white-space: pre-line;
    }

    .node-words {

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