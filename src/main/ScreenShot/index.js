/*
 * @Author: your name
 * @Date: 2020-09-08 22:45:56
 * @LastEditTime: 2020-09-10 19:29:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\main\ScreenShot\index.js
 */
export function updateScreenShot (content) {
  console.log('new Screenshot:' + content)
}

export function saveScreenShot (file) {
  var path = require('path')
  var fs = require('fs')
  var url = path.resolve('./')
  var myDate = new Date()

  let fileName = `scrennshot_${myDate.getTime()}.jpg`
  fs.writeFileSync(`./picture/${fileName}`, Buffer.from(file.toString(), 'base64'), function (error) {
    if (error) {
      console.log('啊这')
    } else {
      console.log('写入成功')
    }
  })
  return url + '\\picture\\' + fileName
}
