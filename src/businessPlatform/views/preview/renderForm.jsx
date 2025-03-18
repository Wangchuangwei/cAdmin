import {h} from 'vue'
import { defineComponent } from 'vue'
import createForm from './createF.jsx'
import form from './createF.jsx'
// import createForm from '@/common/scripts/hooks/createForm'

export default defineComponent({
  props: {
    formConfig:{
			type: Object,
      default() {
        return {
					// cols:"3",
					// labelWidth: 90,
					disabled: false, // 工作流时设置所有基础表单都为disabled
					// closeRuleChangeValidate: true, // 写rules必须加上
					rules:{}
				}
      }
		},
    params: {
      type: Object,
      default() {
        return {}
      }
    },
    items: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    createForm
  },

  setup(props, {attrs, slots, emit}) {
    let newAttrs = Object.entries(attrs).reduce((acc, [key,item]) => {
      if (Object.prototype.toString.call(item) === '[object Function]') {
        acc.listeners[key] = item;
      } else {
        acc.attrs[key] = item;
      }
      return acc;
    }, {attrs: {}, listeners: {}})
    let objAttrs = {
      style: {
        width: '100px',
        height: '200px'
      },
      class: 'test',
      model: {
        orgNo: '111'
      }
    }
    // let itemObj = {
    //   label: '测试',
    //   prop: 'orgNo',

    // }
    return () => <createForm {...objAttrs}></createForm>
    // return () => <div>{form(h, props, newAttrs)}</div>
    // return () => h('div', [form(h, props, newAttrs)])
    // return () => h('div', 'renderForm11')
    // return () => <el-form {...objAttrs}>
    //   {
    //     <el-form-item {...itemObj}></el-form-item>
    //   }
    // </el-form>
  }
})