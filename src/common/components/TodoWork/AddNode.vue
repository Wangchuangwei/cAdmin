<template>
  <div class="add-node-btn-box">
		<div class="add-node-btn">
      <div class="btn">
        <el-tooltip placement="right" trigger="click" effect="light">
          <template #content >
            <div class="add-node-items">
              <ul>
                <li @click="addNodeType(1)">增加审批节点</li>
                <li @click="addNodeType(3)" >增加条件节点</li>
              </ul>
            </div>
          </template>
          <span class="icon" @click="addNode">+</span>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue"
import { getAssetURL } from '../../scripts/utils/common'

const emit = defineEmits(['updateChildNode']) 

const props = defineProps({
  childNode: {
    type: Object,
    default: () => {}
  },
  type: {
    type: String,
    default: 'add'
  }
})

const nodeConfig = {
  type: 0
}

const addNode = () => {
}

const addNodeType = (type) => {
  console.log("props.childNode:", props.childNode)
  if (type === 1) {
    emit('updateChildNode', {
      type: 1,
      nodeName:"",
      approverType:"",
      approverNodeType:"1",
      assigneeList:[],
      childNode: props.childNode,
    })
  } else if (type === 3) {
    emit('updateChildNode', {
      type: 3,
      nodeName: "路由",
      childNode: props.childNode,
      conditionNodes: [
        {
          type: 2,
          nodeName: "",
          priorityLevel: 1,
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
        },
        {
          type: 2,
          nodeName: "",
          priorityLevel: 999,
          conditionType: "1",
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
      ]
    })
  }
}

</script>

<style lang="scss" scoped>
.add-node-btn-box {
  width: 232px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  position: relative;

  &:before {
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

  .add-node-btn {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 232px;
    padding: 20px 0 32px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;

    .btn {
      outline: none;
      -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
      width: 28px;
      height: 28px;
      border-radius: 50%;
      position: relative;
      border: 2px solid #bdc0ca;
      line-height: 24px;
      text-align: center;
      font-size: 26px;
      color: #bdc0ca;
      background: #fff;
      cursor: pointer;

      .icon {
        width: 26px;
        height: 26px;
        line-height: 24px;
        display: inline-block;
        vertical-align: top;
      }
    }
  }
}

.add-node-items {
  font-size: 14px;
  color: rgba(0, 0, 0, .65);
  padding: 4px 0;
  cursor: pointer;

  li {
    height: 32px;
    line-height: 32px;
    text-align: center;

    &:hover {
      background: #eaf2ff;
    }
  }
}

</style>