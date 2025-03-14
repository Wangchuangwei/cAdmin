<!-- 二次封装消息提示弹窗，构造为函数弹窗 -->
<template>
  <div>
    <MsgBox 
      :value="isShow"
      :width="width"
      :styles="{margin:'auto',left:'0',top:'50px'}"
      :closable="closable"
    >
      <template v-slot:header v-if="closable">
        <p>
          <span>{{title}}</span>
        </p>
      </template>
      <div class="content">
        <!-- 内容标题 -->
        <div v-if="modalType == 'success'||modalType == 'print'" class="content-title">
          <img src="@/common/assets/modal/success.svg" class="modal-img">
          <span>{{contentTitle}}</span>
        </div>
        <div v-if="modalType == 'failed'" class="content-title">
          <img src="@/common/assets/modal/failed.svg" class="modal-img">
          <span>{{contentTitle}}</span>
        </div>
        <div v-if="modalType == 'confirm'" class="content-title">
          <img src="@/common/assets/modal/info.svg" class="modal-img">
          <span>{{contentTitle}}</span>
        </div>
        <div v-if="modalType == 'info'" class="content-title">
          <img src="@/common/assets/modal/info.svg" class="modal-img">
          <span>{{contentTitle}}</span>
        </div>
        <!-- 内容详细 -->
        <div class="content-body" v-if="modalType!=='no'">
          <p>{{contentBody}}</p>
        </div>
        <div class="content-body-all-text" v-else>
          <p>{{contentBody}}</p>
        </div>
      </div>
      <template v-slot:footer>
        <div class="pageFooter">
          <div class="pageFooter-buttongroup" v-if="modalType == 'confirm'">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="ensure">确认</el-button>
          </div>
          <div class="pageFooter-buttongroup" v-else-if="modalType == 'print'">
            <el-button type="primary" @click="print">打印</el-button>
            <el-button type="primary" @click="ensure">确认</el-button>
          </div>
          <div class="pageFooter-buttongroup" v-else>
            <el-button type="primary" @click="ensure">我知道了</el-button>
          </div>
        </div>
      </template>
    </MsgBox>
  </div>
</template>

<script setup>
import {ref, onMounted, defineEmits } from 'vue'
import MsgBox from '../../MsgBox/MsgBox.vue';

const isShow = ref(true);

const props = defineProps({
  title: {
    type: String,
    default: '弹窗标题'
  },
  modalType: {
    type: String,
    default: 'confirm'
  },
  contentTitle: {
    type: String,
    default: '内容标题'
  },
  contentBody: {
    type: String,
    default: '内容'
  },
  width: {
    type: Number,
    default: 400
  },
  closable: {
    type: Boolean,
    default: false
  },
  onEnsure: {
    type: Function,
    default: () => {}
  },
  onCancel: {
    type: Function,
    default: () => {}
  }
})

const close = () => {
  emit('on-close')
}
const cancel = () => {
  isShow.value = false;
  props.onCancel();
  close();
}
const ensure = () => {
  isShow.value = false;
  props.onEnsure();
  close();
}

defineEmits(['on-close'])

onMounted(() => {
})

</script>

<style>

</style>