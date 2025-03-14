
export default {
  mounted(el, binding) {
    function documentHandler(e) {
      if (el.contains(e.target)) {
        return false;
      }
      binding.value(e);
    }
    el.__vueclickOutside = documentHandler;  // 匿名函数挂载到属性上，防止销毁时无法引用造成内存泄漏
    document.addEventListener('click', documentHandler);
  },
  unmounted(el ,binding) {
    document.removeEventListener('click', el.__vueclickOutside);
    delete el.__vueclickOutside;
  }
}