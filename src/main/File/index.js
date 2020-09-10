/*
 * @Author: your name
 * @Date: 2020-09-10 12:24:36
 * @LastEditTime: 2020-09-10 16:41:10
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
  fs.writeFileSync(`./${fileName}`, file, function (error) {
    if (error) {
      console.log('啊这')
    } else {
      console.log('写入成功')
    }
  })
  return url + '\\' + fileName
}

export function saveScreenShot (file) {
  var path = require('path')
  var fs = require('fs')
  var url = path.resolve('./')
  var myDate = new Date()

  let fileName = `scrennshot_${myDate.getTime()}.png`
  fs.writeFileSync(`./picture/${fileName}`, file, function (error) {
    if (error) {
      console.log('啊这')
    } else {
      console.log('写入成功')
    }
  })
  return url + '\\picture\\' + fileName
}