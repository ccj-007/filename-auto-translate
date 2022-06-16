/**
 * @description  js工具文件
 */

/**
 * 
 * @param {string} 用于检测是否有中文 
 * @returns boolean
 */
exports.isChina = function (s) {
  var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
  if (!patrn.exec(s)) {
    return false;
  }
  else {
    return true;
  }
}