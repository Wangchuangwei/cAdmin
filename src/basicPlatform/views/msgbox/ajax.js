// https://github.com/ElemeFE/element/blob/dev/packages/upload/src/ajax.js


export default function upload(option) {
  // 检查当前环境是否可用XMLHttpRequest
  if (typeof XMLHttpRequest === 'undefined') return

  const xhr = new XMLHttpRequest()
  const action = option.action

  if (xhr.upload) {
    xhr.upload.onprogress = function (e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100
      }
      option.onProgress(e)
    }
  }

  const formData = new FormData();

  if (option.data) {

  }
  if (option.uploadAll && option.file instanceof Array) {
    option.file.forEach((item, index) => {
      formData.append(option.filename, option.file);
    })
  } else {
    formData.append(option.filename, option.file);
  }

  xhr.onerror = function (e) {
    option.onError(e)
  }

  xhr.onload = function (e) {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(e)
    }
    option.onSuccess(e.target.response)
  }

  xhr.open('post', action, true)



  xhr.send(formData)
}