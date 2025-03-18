import { defineComponent } from "vue"
import {h} from 'vue'

const getKebabCase = (str) => {
  return str.replace(/[A-Z]/g, function (i) {
    return '-' + i.toLowerCase()
  })
}

const handleOn = (onObj) => {
  if (onObj) {
    let obj = {}
    Object.keys(onObj).forEach(key => {
      obj['on' + key] = onObj[key]
    })
    return obj
  } else {
    return false
  }
}

const renderType = (params, row, $h) => {
  const {config = {}} = row
  const defaultAttrs = {
    props: {
      value: params[row.prop], // 获取model数据
      ...config.props
    },
    attrs: {
      ...config.attrs
    },
    on: {
      input(value) { // 处理model数据
        params[row.prop] = value
      },
      ...handleOn(config.on)
    },
  }

  const getComponent = (componentType) => {
    if (componentType) {
      let tag = getKebabCase(componentType)
      if (tag == 'el-input') {

        return <el-input {...defaultAttrs} />
      }


    }
  }

  return getComponent(row.type)
}

export const form = (h, props, attrs) => {
  const {params, items} = props
  const formAttrs = {
    props: {
      model: params,
      ...attrs.attrs
    },
    ref: 'form',
    on: {...attrs.listeners},
  }
  console.log("aaaaa:", formAttrs)
  let resData = items.map((item, index) => {
    if (item.hidden === undefined || !item.hidden) {
      const oClass = item.class
      const oStyle = item.style
      const obj = {
        props: {
          ...item
        },
        class: oClass,
        style: oStyle,
      }
      if (renderType(params, item, h) == undefined) {
        return <div>没有的呢</div>
      } else {
        return <el-form-item key={index} {...obj}>
          {renderType(params, item, h)}
        </el-form-item>
      }
    }
  })
  console.log("resData:", resData)
  return <el-form {...formAttrs}>
    {
      resData
    }
  </el-form>
}

export default defineComponent({
  name: 'createForm',
  props: {
    a: {},
    b: {}
  },
  setup(props) {
    console.log("props12:", props)
    // return () => <div>{form(h, props, newAttrs)}</div>
  }
})

// export default {
//   form,
// }