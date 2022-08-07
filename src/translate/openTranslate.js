/**
 * @description  开始翻译
 */
const options = require('../options/index')
const MysKeyTranslate = require("./MysKeyTranslate"); // 引入刚才保存的文件
const { separator, itemPrefix, specialStr, maxSeparator, auth } = options



/**
 * 开始翻译
 * 
 * @param {string[]} tranOrigin 原始文件夹下的文件名信息
 * @returns Object 文件名信息集合
 */
const openTranslate = async (tranOrigin) => {
  if (JSON.stringify(tranOrigin) === '[]') console.log("不存在中文文件名");
  let tranLeft = tranOrigin.map((item) => item.split('.')[0])
  const tranRight = tranOrigin.map((item) => item = item.split('.')[1])
  const translate = new MysKeyTranslate({
    appid: auth.appid,
    secret: auth.secret,
  });

  String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
  }

  let tranSrc = tranLeft.join('￥')
  let res = await translate(tranSrc, { to: 'en' })
  let newTranList = res.split('￥')

  function formats (s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
      rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
  }
  //格式化
  let newTranListTrim = newTranList.map(item => {
    let res = item.replace(/(^\s*)|(\s*$)/g, "");
    if (!specialStr) {
      res = formats(res)
    }
    let arr = res.split(' ')
    if (arr.length > maxSeparator) {
      arr.splice(maxSeparator - 1, arr.length - 1)
    }
    let str = arr.join(separator)
    return itemPrefix ? itemPrefix + separator + str : str
  })

  return { tranOrigin, tranLeft, tranRight, newTranList: newTranListTrim }
}

module.exports = openTranslate