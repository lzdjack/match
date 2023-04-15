//执行上一个页面方法
export const refresh = (callback, length = 2) => {
  // #ifdef APP-PLUS
  length = 1;
  // #endif
  var pages = getCurrentPages();
  var prevPage = pages[pages.length - length]; //上(length-1)个页面
  if (callback) {
    prevPage.$vm[callback](); // 上(length-1)页面方法
  }
};
