/**
 * @description  文件操作
 */

const fs = require('fs')
const path = require('path')
const { isChina } = require('../utils/index')
const options = require('../options/index')

const { canFormat, entry, exclude } = options
const tranPath = path.join(process.cwd(), '/', entry)

/**
 * 读取指定目录文件夹下的文件名
 * 
 * @returns string[] 返回原始文件名数组
 */
exports.readFile = () => {
  let tranList = []
  function getTranList (tranPath) {
    const readDir = fs.readdirSync(tranPath);
    for (let index = 0; index < readDir.length; index++) {
      const filename = readDir[index];
      let destUrl = path.join(tranPath, '/', filename)
      let stats = fs.lstatSync(destUrl)

      if (stats.isDirectory()) {  //如果是文件夹递归处理
        getTranList(destUrl)
      } else {
        //校验
        if (canFormat.findIndex(suffix => filename.includes(suffix)) > -1 && isChina(filename)) {
          if (exclude.length > 0 && exclude.some(item => filename.includes(item))) {
            continue
          }
          tranList.push(filename)
        }
      }
    }
  }
  getTranList(tranPath)

  return tranList
}

/**
 * 用于改变文件夹的名字
 * 
 * @param {Object} tranInfo 
 * @returns 
 */
exports.changeFilename = (tranInfo) => {
  let { tranOrigin, tranRight, newTranList } = tranInfo //tranOrigin 原始   tranLeft 后缀前 tranRight 后缀后 newTranList 翻译后
  console.log(tranOrigin, tranRight, newTranList);
  if (!tranOrigin || !tranOrigin.length) return

  function getChange (tranPath) {
    const readDir = fs.readdirSync(tranPath);
    readDir.forEach(filename => {
      let destUrl = path.join(tranPath, '/', filename)
      let stats = fs.lstatSync(destUrl)
      if (stats.isDirectory()) {
        getChange(destUrl)
      } else {
        //查找对应的翻译结果
        let id = tranOrigin.findIndex(name => name === filename)
        if (id > -1) {
          fs.rename(destUrl, tranPath + '/' + newTranList[id] + '.' + tranRight[id], (err) => {
          })
        }
      }
    })
  }
  getChange(tranPath)
}
