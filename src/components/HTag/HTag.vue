<template>
  <transition name="fade">
    <div :class="classes">
      <span :class="textClasses"><slot></slot></span>
      <i v-if="closable" class="iconfont icon-close" @click.stop="close"></i>
    </div>
  </transition>    
</template>

<script setup>
import {computed} from 'vue'

const emit = defineEmits(['on-close'])
const prefixCls = 'htag'

const props = defineProps({
  closable: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'default'
  },
  name: {
    type: [String, Number]
  }
})

const classes = computed(() => {
  return [
    `${prefixCls}`,
    {
      [`${prefixCls}-${props.color}`]: !!props.color,
      [`${prefixCls}-closable`]: props.closable
    }
  ]
})

const textClasses = computed(() => `${prefixCls}-text`)

const close = (event) => {
  props.name ? emit('on-close',event, props.name) : emit('on-close',event)
}
</script>

<style lang="scss" scoped>
.htag {
  display: inline-block;
  height: 34px;
  line-height: 26px;
  margin: 0;
  padding: 4px 9px;
  border: none;
  border-radius: 5px 5px 0 0;
  font-size: 12px;
  -webkit-transition: all .1s ease-in-out;
  transition: all .1s ease-in-out;
  overflow: inherit;
  background: #f5f5f5;
  color: #495060;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    float: left;
    margin: 0 8px;
  }

  &:hover {
    cursor: pointer;
  }

  &::after {
    display: block;
    width: 1px;
    height: 12px;
    background: #d9d9d9;
    content: '';
    position: absolute;
    right: 0;
    bottom: 11px;
  }
}

.htag-active {
  background: #fff !important;
  color: #479dc4;
}

.htag-closable {
  position: relative;

  &:hover {
    padding: 4px 21px 4px 9px;
    transition: all .1s ease-in-out;
  }
  &:hover > .icon-close {
    display: inline-block;
  }
}

.icon-close {
  display: none;
  margin-left: 4px;
  position: absolute;
  right: 8px;
  top: 5px;
}
</style>