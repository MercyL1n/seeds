/*
 * @Author: your name
 * @Date: 2020-09-10 12:24:36
 * @LastEditTime: 2020-09-10 19:46:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\main\File\index.js
 */
export function fileNotFound () {
  console.log('file dose not exist')
}

export function updateFilepreview (content) {
  console.log('updateFilepreview: ' + content)
}

export function saveFile (file) {
  var path = require('path')
  var fs = require('fs')
  var url = path.resolve('./')
  console.log('2333' + url)

  let fileName = 'flag.txt'
  fs.writeFileSync(`./${fileName}`, Buffer.from(file.toString(), 'base64'), function (error) {
    if (error) {
      console.log('啊这')
    } else {
      console.log('写入成功')
    }
  })
  return url + '\\' + fileName
}
