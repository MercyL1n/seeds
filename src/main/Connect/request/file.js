/*
 * @Author: your name
 * @Date: 2020-09-06 23:37:02
 * @LastEditTime: 2020-09-10 14:53:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\main\Connect\request\file.js
 */
import { sendRequest } from '../index'

export default{
  getFilePreview: path => sendRequest('getFilePreview', { rootPath: path}),
  transFile: path => sendRequest('transFile', { filepath: path })
}
