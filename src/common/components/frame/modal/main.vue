<!-- 二次封装详情提示弹窗，构造为函数弹窗 -->
 <template>
   <div>
    <MsgBox
      :value="isShow"
      :width="width"
      :height="height"
      :styles="{
        left:'calc(50% - '+width/2+'px'+')',
        top:'50px',
        height:'auto',
      }"
      :closable="closable"
      @on-close="close"
    >
      <template v-slot:header v-if="closable">
        <p>
          <span>{{title}}</span>
        </p>
      </template>
      <div class="modal-body">
        <slot 
          :title="title" 
          :editType="editType" 
          :modifyData="modifyData" 
          :workFlag="workFlag"
          :width="width" 
          :height="height" 
          @handleAction="close"
        ></slot>
      </div>
      <template v-slot:footer>
        <div style="height: 25px;"></div>
      </template>
    </MsgBox>
   </div>
 </template>
 
 <script setup>
import { onMounted, ref } from 'vue';
import MsgBox from '../../MsgBox/MsgBox.vue';

const isShow = ref(true);

const props = defineProps({
  closable: {
    type: Boolean,
    default: true
  },
  //弹框标题
  title: {
    type: String,
    default: ''
  },
  //操作类型-新增:add,修改:modify,查看:view,打印:print
  editType: {
    type: String,
    default: ''
  },
  //业务数据
  modifyData: {
    type: Object,
    default: () => {}
  },
  // 弹窗宽度
  width: {
    type: Number,
    default: 250
  },
  // 弹窗高度
  height: {
    type: Number,
    default: 500
  },
  // 是否走工作流
  workFlag: {
    type: Boolean,
    default: false
  },
  onClose: {
    type: Function,
    default: () => {}
  },
})

const open = () => {
  isShow.value = true;
}

const close = () => {
  isShow.value = false;
  props.onClose();
}

onMounted(() => {
  console.log("modal props:", props)
})
</script>
 
<style lang="scss" scoped>
</style>