/*
 * @Author: your name
 * @Date: 2020-09-06 23:37:02
 * @LastEditTime: 2020-09-10 13:43:10
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\main\Connect\request\file.js
 */
import { sendRequest } from '../index'

export default{
  getFilePreview: () => sendRequest('getFilePreview'),
  transFile: path => sendRequest('transFile', { filepath: path })
}
