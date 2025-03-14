// module.exports = (name) => {
//   return import('@/src/' + name + '/index.js')
// }

export default (name) => {
  return import(/* @vite-ignore */'../../../' + name + '/index.js')
}