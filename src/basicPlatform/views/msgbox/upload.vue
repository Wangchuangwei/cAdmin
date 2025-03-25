<template>
  <div>
    <form ref="form">
      <input
        ref="input"
        type="file"
        :multiple="multiple"
        :accept="accept"
        @change="handleChange"
        @input="handleChange"
      />
    </form>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const form = ref(null)
const input = ref(null)

const props = defineProps({
  accept: {
    type: String,
  },
  format: { 
    type: Array,
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: true
  },
  /* 多选文件时，合并触发before-upload、on-format-error、on-exceed-size等钩子 */
  mergeHook: {
    type: Boolean,
    default: false
  },
  maxSize: {
    type: Number,  // 单位为kb
  },
  onExceededSize: {
    type: Function,
    default() {
      return {};
    }
  },
  onFormatError: {
    type: Function,
    default() {
      return {};
    }
  },
  // maxCount: {
  //   type: Number,
  //   default: 0
  // },
  beforeUpload: Function,
  onProgress: {
    type: Function,
   default: () => {}
  }
})

const fileList = ref([]);
const uploadAllAutoList = ref([]);  // uploadAll时，自动上传的list
const errorList = ref([]); // 上传失败列表

/**
 * 检查文件格式、大小等
 * @return Array 第一个元素为检查结果，第二个元素为检查失败的类型
 */
const checkFile = (file) => {
  // 检查文件格式
  if (props.format.length) {
    const _file_format = file.name.split('.').pop().toLocaleLowerCase();
    const checked = props.format.some((item) =>  _file_format === item.toLocaleLowerCase());
    if(!checked) {
      return [false, 'format']
    }
  }

  // 检查文件大小
  if (props.maxSize) {
    if (file.size > props.maxSize * 1024)  return [false, 'size']
  }

  return [true]
}

/**
 * 上传文件
 */
const post = (file) => {
  const post = (fileItem) => {
    console.log('cur ssssss')
  }


  console.log('post', file)
  let valid; // 文件是否通过检查
  let invalidType; //未通过检查的类型
  let invalidFile; // 未通过检查的文件
  // 当开启mergeHook时，file为数组
  if (Array.isArray(file)) {
    // 只要有一个文件检查失败就无法完成提交
    valid = file.every((item) => {
      const result = this.checkFile(item);
      if (!result[0]) {
        invalidFile = item;
        invalidType = result[1];
      }
      return result[0]
    })
  } else {
    const result = checkFile(file)
    valid = result[0]
    if (!valid) {
      invalidType = result[1]

      let type = file.type
      let fileName = file.name
      if (file.type) {
        const splitIndex = file.name.lastIndexOf('.');
        type = file.name.substring(splitIndex + 1, file.name.length);
        fileName = file.name.substring(0, splitIndex);
      }
      const _file = {
        status: 'fail',
        name: file.name,
        size: file.size,
        // uid: file.uid,
        isShow: true,
        type: type,
        fileName: fileName
      };
      invalidFile = _file;
    }
  }
  switch (invalidType) {
    case 'format':
      // 将格式错误文件展示在错误列表
      errorList.value.push(invalidFile);
      props.onFormatError(invalidFile, fileList.value);
      break;
    case 'size':
      errorList.value.push(invalidFile);
      props.onExceededSize(invalidFile, fileList.value);
      break;
  }
  if (valid) {
    // 上传文件
    if (Array.isArray(file)) {
      file.forEach((item) => post(item));
    } else {
      console.log('postssssssssssssssss', file)
      post(file);
    }
  }
}

/**
 * 上传文件前的操作
 */
const upload = (file) => {
  console.log('beforeUpload', props.beforeUpload)
  if (!props.beforeUpload) {
    post(file)
  }
  const before = props.beforeUpload(file, fileList.value)
  if (before && before.then) {

  } else if (before !== false) {
    post(file)
  } else {

  }
}

/**
 * 处理上传的文件，转为数组
 */
const uploadFiles = (files) => {
  uploadAllAutoList.value = [];
  // 将类对象转换为数组对象
  let postFiles = Array.prototype.slice.call(files);
  if (!props.multiple) postFiles = postFiles.slice(0, 1);

  if (postFiles.length === 0) return;
  if (props.mergeHook) {
    upload(postFiles)
  } else {
    postFiles.forEach((file) => {
      upload(file)
    })
  }

}

/**
 * 获取input上传的文件
 */
const handleChange = (e) => {
  const files = e.target.files;
  if (!files) {
    return;
  }
  uploadFiles(files)
  e.target.value = ''; // 去除默认显示的文件名称
  form.value.reset(); // 清空表单
}
</script>

<style>

</style>