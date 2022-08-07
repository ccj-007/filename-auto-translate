const options = {
  canFormat: ['.jpg', '.png'],  //支持的文件名
  itemPrefix: 'node',
  separator: '-', //文件名的分割符号
  exclude: ['测试'], //如果文件名包含会被排除
  specialStr: false,   //是否允许特殊字符, 默认不允许
  auth: {     //使用者需要去官方申请密钥，开发者用户可以免费获取限流的api翻译接口
    appid: '20220609001243142',
    secret: '7ck5ZZEKepsN7GZLthKo'
  },
  entry: 'images', //入口
  maxSeparator: 3,
}

module.exports = options