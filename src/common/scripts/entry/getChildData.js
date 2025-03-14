// const _import = require('./_import_' + process.env.NODE_ENV)
import _import from './_import_development.js'

export function getChildData (sysname) {
  return new Promise((resolve, reject) => {
    _import(sysname).then(res => {
      resolve(res)
    })
  })
}