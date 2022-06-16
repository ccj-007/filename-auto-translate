/**
 * @description  开始翻译
 */

const MysKeyTranslate = require("./MysKeyTranslate"); // 引入刚才保存的文件

/**
 * 开始翻译
 * 
 * @param {string[]} tranOrigin 原始文件夹下的文件名信息
 * @returns Object 文件名信息集合
 */
const openTranslate =  async (tranOrigin) => {
  if(JSON.stringify(tranOrigin) === '[]') console.log("不存在中文文件名");
  const tranLeft = tranOrigin.map((item) => item = item.split('.')[0])
  const tranRight = tranOrigin.map((item) =>  item = item.split('.')[1])
  const translate = new MysKeyTranslate({
    appid: "20220609001243142",  
    secret: "7ck5ZZEKepsN7GZLthKo", 
  });

  let tranSrc = tranLeft.join('￥')
  let res = await translate(tranSrc, {to: 'en'})
  let newTranList = res.split('￥')
  console.log('翻译结果', newTranList)
  return {tranOrigin, tranLeft, tranRight, newTranList}
}

module.exports =  openTranslate