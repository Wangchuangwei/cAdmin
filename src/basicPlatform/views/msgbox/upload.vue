<template>
  <div>{{ dragOver }}</div>
  <div :class="wrapCls">
    <div :class="wrapperCls">
      <div
        :class="classes"
        @click="handleClick"
        @drop.prevent="onDrop"
        @dragover.prevent="dragOver = true"
        @dragleave.prevent="dragOver = false"
      >
        <form ref="form">
          <input ref="input" type="file" :multiple="multiple" :accept="accept" @change="handleChange"
            @input="handleChange" />
        </form>
      </div>
    </div>
  </div>


</template>

<script setup>
import {computed, ref} from 'vue'
import uuid from 'uuid'
import ajax from './ajax'

const form = ref(null)
const input = ref(null)

const prefixCls = 'h-upload'
const dragOver = ref(false);

const wrapCls = computed(() => {
  return [`${prefixCls}`];
})
const wrapperCls = computed(() => {
  return [
    `${prefixCls}-click-wrapper`,
    {
      [`${prefixCls}-self`]: props.selfConfig

    }
  ];
})
const classes = computed(() => {
  return [
    `${prefixCls}`,
    {
      [`${prefixCls}-select`]: props.type === 'select',
      [`${prefixCls}-drag`]: props.type === 'drag',
      [`${prefixCls}-dragOver`]: props.type === 'drag' && dragOver.value
    }
  ];
})

const props = defineProps({
  // 上传的文件字段名,必须与服务端保持一致
  name: {
    type: String,
    default: 'file'
  },
  // 上传地址
  action: {
    type: String,
    required: true
  },
  // 上传时的额外参数
  data: {
    type: Object
  },
  accept: {
    type: String,
  },
  headers: {
    type: Object,
    default() {
      return {};
    }
  },
  type: {
    type: String,
    validator: (type) => {
      return ['select', 'drag'].indexOf(type) > -1;
    },
    default: 'select'
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
  // 配置手动上传
  selfConfig: {
    type: Boolean,
    default: false
  },
  uploadAll: {
    // selfConfig下使用
    type: Boolean,
    default: false
  },
  beforeUpload: {
    type: Function
  },
  onProgress: {
    type: Function,
    default: () => {}
  }
})

const fileList = ref([]); // 上传列表
const selfConfPostList = ref([]); // 手动上传时，保存真正的文件列表
const temIndex = ref(1); // 记录upload的文件数量，用于uid
const uploadAllAutoList = ref([]);  // uploadAll时，自动上传的list
const errorList = ref([]); // 上传失败列表

const xhr = ref({}) // xhr对象，支持上传多个文件

/**
 * 针对上传时，获取当前上传的文件对象
 */
const getFile = (file) => {
  const _file = fileList.value.find((item) => item.uid === file.uid);
  return _file || {};
}

/**
 * 从上传列表中移除文件
 */
const handleRemovePostFile = (file) => {
  selfConfPostList.value.splice(selfConfPostList.value.indexOf(file), 1)
}

/**
 * 上传进度条
 */
const handleProgress = (e, file) => {
  if (file instanceof Array) {

  } else {
    const _file = getFile(file)
    props.onProgress(e, _file, fileList.value)
    _file.percentage = e.percentage || 0;
  }
}

/**
 * 上传成功
 */
const handleSuccess = (res, file) => {
  console.log("success:")
}

/**
 * 上传失败
 */
const handleError = (err, response, file) => {
  if (file instanceof Array) {

  } else {
    const _file = getFile(file)
    const _file_fail = {
      status: 'fail',
      name: _file.name,
      size: _file.size,
      uid: _file.uid,
      isShow: true,
      type: _file.type,
      fileName: _file.fileName
    }
    errorList.value.push(_file_fail);
    // 上传失败，隐藏进度条

    // 移除失败文件
    fileList.value.splice(fileList.value.indexOf(file), 1)
    handleRemovePostFile(file)
  }
}
/**
 * 开始上传文件
 */
const startPost = (file) => {
  console.log('startPost', file)
  // 如果当前文件有xhr，不用再次新建
  const id = props.uploadAll &&  file instanceof Array ? uuid() : file.uid;
  if (!xhr.value[id]) {
    const cur_xhr = ajax({
      action: props.action,
      headers: props.headers,
      filename: props.name,
      uploadAll: props.uploadAll && file instanceof Array,
      data: props.data,
      file: file,
      onProgress: (e) => {
        handleProgress(e, file)
      },
      onSuccess: (res) => {
        handleSuccess(res, file);
      },
      onError: (err, response) => {
        handleError(err, response, file);
      }
    })
    xhr.value[id] = cur_xhr;    
  }

}

/**
 * 上传文件-文件列表
 */
const handleStart = (file) => {
  const _file = {
    status: 'uploading',
    name: file.name,
    size: file.size,
    uid: file.uid,
    isShow: true,
    type: file.type,
    fileName: file.name
  }
  fileList.value.push(_file);
  if (props.selfConfig) {

  }
}

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
 * 上传文件-文件校验, 获取待上传列表
 */
const post = (file) => {
  const post = (fileItem) => {
    handleStart(fileItem)
    // 手动控制，校验完文件显示待上传列表
    if (props.selfConfig) {

    } else if (props.uploadAll) {

    } else {
      startPost(fileItem)
    }
  }

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
      // uid标识每个file,便于后续匹配对应file
      file.uid = Date.now() + temIndex.value++;
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
        uid: file.uid,
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
      post(file);
    }
  }
}

/**
 * 上传文件前的操作-beforeUpload
 */
const upload = (file) => {
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