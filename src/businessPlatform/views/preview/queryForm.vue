<template>
  <div
    class="clearfix"
    :class="{
      'c-searchAdvanced': !onlyOneRow && formConfigData.cols === 3,
    }"
  >
    <el-form :model="params" ref="queryForm" v-bind="formConfigData">
      <template v-for="(item, index) in itemsData" :key="item.prop + index">
        <el-form-item
          v-if="item.type && !(item.hasOwnProperty('isHidden') && item.isHidden() || (item.hasOwnProperty('hidden') && item.hidden))"
          v-bind="item.formItemProps"
          :style="item.style || {}"
          :class="item.class || {}"
          :required="(item.hasOwnProperty('isRequired')&&item.isRequired()) || (item.hasOwnProperty('required') && item.required)"
        >
          <component
            :is="item.tag"
            v-model="params[item.prop]"
            v-bind="item.config.props || {}"
            v-on="item.config.on || {}"
            :style="item.config.style||{}"
            :class="item.config.class||''"
            :disabled="(item.config.props.hasOwnProperty('isDisabled')&&item.config.props.isDisabled()) || (item.config.props.hasOwnProperty('disabled') && item.config.props.disabled)"
          ></component>
        </el-form-item>
        <slot v-if="!item.type" :name="item.prop" v-bind:formData="params"></slot>
      </template>
      <slot></slot>
      <!-- 操作按钮 -->
      <div class="fix-button">
      
      </div>
    </el-form>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue'

const props = defineProps({
  // 接受v-model绑定的值
  value: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // 列配置
  items: {
    type: Array,
    default: () => {
      return []
    }
  },
  // form配置
  formConfig: {
    type: Object,
    default: () => {
      return {
        cols: 3, // 表单只有一列时设置为4,有高级搜索时设置为3
        rules: {}
      }
    }
  },
  // 查询按钮的权限控制
  menuCode: {
    type: String,
    default: ''
  },
  showSearchAdvanced: {
    type: Boolean,
    default: true
  },
})

let itemsData = ref(props.items)
let formConfigData = props.formConfig
const isopenSearchAdvanced = ref(false)  // 高级搜索展开/收缩控制
const hasQueryBtn = ref(false) // 是否有高级搜索按钮
const onlyOneRow = ref(false) // 是否只有一行查询条件
const params = ref({})

const queryForm = ref()

watch(() => props.value, (newVal) => {
  params.value = newVal
})

// 初始化form属性
const initFormConfig = () => {
  formConfigData.cols = props.formConfig.cols ? Number(props.formConfig.cols) : 3
  formConfigData.labelWidth = props.formConfig.labelWidth ? Number(props.formConfig.labelWidth) : 108
  // 是否有高级搜索
  if (props.items.length >  formConfigData.cols) {
    hasQueryBtn.value = true
  }
}

// 转换组件名称,驼峰格式转-
const getKebabCase = (str) => {
  return str.replace(/[A-Z]/g, function (i) {
    return '-' + i.toLowerCase()
  })
}

// 转换formItem的props属性, 只将包含在props的属性挂载
const convertFormItemProps = (item) => {
  const {config, type, ...formItemProps} = item
  item.formItemProps = formItemProps
}

// 组件的props处理
const convertComponentProps = (item) => {
  // 组件名称由驼峰转换为分隔符展示
  item.tag = item.type ? getKebabCase(item.type) : ''
  item.config = item.config || {}
  item.config.props = item.config.props || {}
  item.config.on = item.config.on || {}
  // 各个组件的默认值处理
  const defaultProps = {
    'elInput': {
      clearable: item.config.props.hasOwnProperty('clearable') ? item.config.props.clearable : true,
    }
  }
  item.config.props = Object.assign(item.config.props, defaultProps[item.type] || {})

  // 详情通过formConfig.disabled统一控制disabled属性
  if (props.formConfig.disabled) {
    item.config.props.disabled = true
  }
}
// 初始化form-item和组件的属性
const initFormItemConfig = () => {
  itemsData.value.forEach((item, index) => {
    // 初始化h-form-item的props
    convertFormItemProps(item)
    // 表单组件的props处理
    convertComponentProps(item)
    // 超出一行存在必输,则默认展开高级搜索
    if (index > formConfigData.cols - 1 && (item.required || (item.hasOwnProperty('isRequired') && item.isRequired()))) {
      isopenSearchAdvanced.value = true
    }
  })
  // 判断是否只有一行
  if (formConfigData.cols > itemsData.value.length) {
    onlyOneRow.value = true
    formConfigData.cols = formConfigData.cols + 1
  }
}

onMounted(() => {
  params.value = props.value
  // 初始化form表单的props属性
  initFormConfig()
  // 初始化form-item和组件的props属性
  initFormItemConfig()
})
</script>

<style lang="scss" scoped>
.c-searchAdvanced {
  .el-form {
    position: relative;
    padding-right: 25%;
    .el-form-item {
      width: 25%;
    }
    .el-form-item:nth-child(n+4){
      display: none;
    }
    .slot:nth-child(n+4){
      display: none;
    }
  }
}

</style>