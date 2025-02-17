<!-- 消息提示弹框组件 -->
<template>
  <div
    v-transfer-dom="targetNode"
  >
    <transition :name="transitionNames[1]">
      <div
        v-show="visible"
        :class="maskClasses"
        :style="styleclsMask"
        @click="mask"
      ></div>
    </transition>
    <div 
      ref="wrap"
      :class="wrapClasses"
      :style="styleclsMainWrap"
      @click="handleWrapClick"
    >
      <transition :name="transitionNames[0]">
        <div
          v-show="visible"
          v-if="rendered || !lazyload"
          ref="content"
          :class="[prefixCls + '-content']"
          :style="mainStyles"
        >
          <a v-if="closable" :class="[prefixCls + '-close']" @click="close">
            <slot name="close">
              <el-icon size="14" color="#f7f7f7"><Close /></el-icon>
            </slot>
          </a>
          <div
            v-if="showHead"
            ref="msgHeader"
            :class="[prefixCls + '-header']"
          >
            <slot name="header">
              <div :class="[prefixCls + '-header-inner']">{{ title }}</div>
            </slot>
          </div>
          <div
            ref="box"
            :class="[prefixCls + '-body']"
            :style="contentStyle"
            @scroll="onScroll"
          >
            <slot></slot>
          </div>
          <div
            v-if="!footerHide"
            ref="msgFooter"
            :class="[prefixCls + '-footer']"
          >
            <slot name="footer">
              <el-button v-if="isOkLeft" type="primary" :loading="buttonLoading" @click="ok">{{localeOkText}}</el-button>
              <el-button @click="cancel">{{localeCancelText}}</el-button>
              <el-button v-if="!isOkLeft" type="primary" :loading="buttonLoading" @click="ok">{{localeOkText}}</el-button>
            </slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, watchEffect, onMounted, onUnmounted, useSlots} from 'vue'
import TransferDom from '../../scripts/directives/transfer-dom'
import {on, off} from '../../utils/dom'

directives: {
  TransferDom
}

const props = defineProps({
  value: {
    type: Boolean,
    default: false
  },
  closable: {
    type: Boolean,
    default: true
  },
  title: {
    type: String
  },
  width: {
    type: [Number, String],
    default: 520
  },
  height: [String, Number],
  maxHeight: [String, Number],
  okText: {
    type: String
  },
  cancelText: {
    type: String
  },
  loading: {
    type: Boolean,
    default: false
  },
  styles: {
    type: Object
  },
  className: {
    type: String
  },
  transitionNames: {
    type: Array,
    default() {
      return ['ease', 'fade'];
    }
  },
  zIndex: {
    type: Number,
    default: 1000
  },
  maskTop: {
    top: [String, Number],
    default: null
  },
  maskLeft: {
    top: [String, Number],
    default: null
  },
  className: {
    type: String
  },
  transfer: {
    type: Boolean,
    default: true
  },
  top: {
    type: [String, Number],
    default: 100
  },
  left: [String, Number],
  customTransferClassName: {
    type: String
  },
  // 是否能够对msgbox里的文本进行复制
  allowCopy: {
    type: Boolean,
    default: false
  },
  /* 是否开启内容懒加载 */
    lazyload: {
    type: Boolean,
    default: false
  },
  // 弹窗在指定节点中进行加载
  // 传入的节点为DOM节点或者css选择器
  targetNode: {
    type: [Element, String]
  },
  footerHide: {
    type: Boolean,
    default: false
  },
  isOkLeft: {
    type: Boolean,
    default: false
  },
  // 该属性设置为false 点击确定按钮默认不关闭弹窗
  beforeOkClose: {
    type: Function
  },
  escClose: {
    type: Boolean,
    default: false
  },
  // escClose 触发前调用的函数，其返回结果影响弹窗关闭与否
  beforeEscClose: {
    type: Function,
    default: () => true
  },
})

const prefixCls = 'h-modal'
const wrapShow = ref(false)
const visible = ref(props.value)
const rendered = ref(false)

const screenWidth = ref(null)
const curWidth = ref(props.width)
const curHeight = ref(0)

const showHead = ref(true)
const headerHeight = ref(0)
const footerHeight = ref(0)
const WindosInnerHeight = window.innerHeight

const buttonLoading = ref(false)
const realClose = ref(true)

const $slots = useSlots()

const allHeight = computed(() => {
  const hHeight = showHead.value ? headerHeight.value : 0
  const fHeigth = props.footerHide ? footerHeight.value : 0
  return hHeight + fHeigth + Number(props.height);
})

const wrapClasses = computed(() => {
  return [
    `${prefixCls}-wrap`,
    {
      [`${prefixCls}-hidden`]: !wrapShow,
      [`${props.className}`]: !!props.className,
      [props.customTransferClassName]: props.transfer && !!props.customTransferClassName
    },
    {
      [`${prefixCls}-copy`]: props.allowCopy,
      [`${prefixCls}-nocopy`]: !props.allowCopy
    }
  ]
})

const maskClasses = computed(() => {
  return [
    `${prefixCls}-mask`,
    {
      [props.customTransferClassName]: props.transfer && !!props.customTransferClassName
    }
  ];
})

const styleclsMask = computed(() => {
  const style = {};
  style.zIndex = props.zIndex;
  if (props.maskTop) {
    style.top = props.maskTop + 'px';
  }
  if (props.maskLeft) {
    style.left = props.maskLeft + 'px';
  }
  return style;
})

const styleclsMainWrap = computed(() => {
  const style = {};
  style.zIndex = props.zIndex;
  if (props.maskTop) {
    style.top = props.maskTop + 'px';
  }
  if (props.maskLeft) {
    style.left = props.maskLeft + 'px';
  }
  // if (allHeight.value >= WindosInnerHeight) {
  //   // 如果msgbox高度超出浏览器，则不能垂直居中，display一律设置成block
  //   style.display = 'block';
  // }
  return style;
})

const mainStyles = computed(() => {
  screenWidth.value = document.documentElement.clientWidth;
  const style = {};
  const width = parseInt(curWidth.value, 10)
  const offsetWidth = width <= 100 ? screenWidth.value * width / 100 : width
  const styleWidth = {
    width: width <= 100 ? `${width}%` : `${width}px`,
    height: curHeight.value ? curHeight.value + 'px' : 'auto'
  };
  if (props.height && props.height < 100 && !curHeight.value) {
    styleWidth.height = `${props.height}%`;
  }
  style.top = props.top + 'px';

  style.left = props.left ? props.left + 'px' : (screenWidth.value - offsetWidth) / 2 + 'px';
  
  const customStyle = props.styles ? props.styles : {};
  Object.assign(style, styleWidth, customStyle);
  return style;
})

const contentStyle = computed(() => {
  const style = {};
  if (props.height) {
    style.overflowY = 'auto';
    style.height = props.height <= 100 ? 'auto' : `${props.height}px`;
  }
  if (props.maxHeight) {
    style.overflowY = 'auto';
    style.maxHeight = `${props.maxHeight}px`;
  }

  return style;
})

const localeOkText = computed(() => {
  if (props.okText === undefined) {
    return '确定';
  } else {
    return props.okText;
  }
})

const localeCancelText = computed(() => {
  if (props.cancelText === undefined) {
    return '取消'
  } else {
    return props.cancelText;
  }
})

const cancel = () => {
  visible.value = false
  emit('on-cancel')
}

const ok = () => {
  if (props.beforeOkClose) {
    if (props.loading) {
      buttonLoading.value = true;
    }
  } else {
    if (!props.loading) {
      // 不传beforeOkClose 默认关闭
      visible.value = false;
      buttonLoading.value = false;
      this.$emit('input', false);
    } else {
      buttonLoading.value = true;
    }    
  }
}

const close = () => {
  visible.value = false
  emit('on-close')
}

const EscClose = (e) => {
  if (visible.value && props.escClose && props.realClose) {
    if (e.keyCode === 27) {
      // esc 关闭前判断 beforeEscClose 函数返回
      const flag = this.beforeEscClose && this.beforeEscClose();
      if (!flag) return;
      this.$emit('on-cancel');
      cancel();
    }
  }
}

watchEffect(() => {
  visible.value = props.value
  if (props.value === false) {
    buttonLoading.value = false;
  }

  if (!!props.title) showHead.value = true;

  curWidth.value = props.width;
})

onMounted(() => {
  if (visible.value) {
    // wrapShow.value = true
  }

  if ($slots.header === undefined && !props.title) {
    showHead.value = false;
  }


  on(document, 'keydown', EscClose);
})
onUnmounted(() => {
  off(document, 'keydown', EscClose);
})
</script>

<style>

</style>