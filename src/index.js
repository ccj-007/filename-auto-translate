/**
 * @description  项目入口
 */

const openTranslate = require('./translate/openTranslate')
const { readFile, changeFilename } = require('./fs/handleFile')

!(async function () {
  //读取文件
  const tranOrigin = readFile()

  console.log("tranOrigin", tranOrigin);
  //翻译转换
  let tranInfo = await openTranslate(tranOrigin)
  //重命名
  changeFilename(tranInfo)
}());




