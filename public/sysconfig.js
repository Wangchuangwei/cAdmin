'use strict'

/**
 * 防止代码合并或压缩时可能出现的意外行为。防止前一行代码的意外合并
 */
;(function(global) {
  global.LOCAL_CONFIG = {
    TABS_VIEW_LIMIT: 10, // tab页最大打开数量TABS_VIEW_LIMIT-1
    isRefresh: false, // 缓存页面时是否需要在关闭选项卡处刷新页面
    SYS_NAME: '个人开发平台',
    THEME: 'lightblue', //lightblue
    isToken: true, // 为false时证明不需要登录
    STORAGE_TIME: 1, // storage 存储时间，单位：分钟
    isMergeMenu: false, //是否合并菜单
    fileSize: 10240, //上传文件大小限制，单位 kb
  }
})(window);