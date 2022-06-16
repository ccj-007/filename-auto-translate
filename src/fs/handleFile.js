/**
 * @description  文件操作
 */

const fs = require('fs')
const path = require('path')
const {isChina} = require('../utils/index')

/**
 * 读取指定目录文件夹下的文件名
 * 
 * @returns string[] 返回原始文件名数组
 */
exports.readFile = () => {
  const readDir = fs.readdirSync("./images");
  const canFormat = ['.jpg', '.png']
  let tranList = []
  if (readDir) {
    canFormat.forEach(format => {
      readDir.forEach(filename => {
        if (filename.includes(format) && isChina(filename)) {
          tranList.push(filename)
        }
      })
    })
  }
  return tranList
}

/**
 * 用于改变文件夹的名字
 * 
 * @params  Object 返回文件名信息数组 tranOrigin 原始   tranLeft 后缀前 tranRight 后缀后 newTranList 翻译后
 */
exports.changeFilename = (tranInfo) => {
  let {tranOrigin, tranRight, newTranList} = tranInfo
  console.log(tranOrigin, tranRight, newTranList);
  if(!tranOrigin || !tranOrigin.length) return
  let p = path.join(process.cwd(), '/images/')
  console.log("图片文件目录-----", p)

  for(let i = 0; i < tranOrigin.length; i++) {
    fs.rename(p + tranOrigin[i], p + newTranList[i] + '.' + tranRight[i], (err) => {
      if (err) {
        console.log('出错')
      } else {
        console.log('未出错')
      }
    })
  }
}
