/**
 * 防抖函数
 * @param {Object} fn
 * @param {Object} wait
 */
export function debounce(fn, wait) {
  var timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, wait);
  };
}
