/*
 * @Auther: MercyLin
 * @Description: description
 * @Date: 2020-09-06 23:37:02
 * @LastEditors: MercyLin
 * @LastEditTime: 2020-09-10 22:11:31
 * @FilePath: \my-project\src\main\Connect\request\file.js
 */
import { sendRequest } from '../index'

export default{
  getFilePreview: path => sendRequest('getFilePreview', { rootPath: path}),
  transFile: path => sendRequest('transFile', { filepath: path })
}
