/*
 * @Auther: MercyLin
 * @Description: socket server启动与client管理
 * @Date: 2020-09-10 12:24:36
 * @LastEditors: MercyLin
 * @LastEditTime: 2020-09-10 21:58:32
 * @FilePath: \my-project\src\main\Connect\server.js
 */

import { processData } from './index'
import Target from '../TargetList/target'
var net = require('net')
var serverIP = '127.0.0.1'
var serverPort = 10553

export let targetUuid
export var clientList = []
export let server = null
let data = Buffer.alloc(0)

/**
 * @description: 启动server服务
 */
export function startServer () {
  if (server !== null) {
    server.close()
    server = null
  }
  server = net.createServer(function (sock) {
    console.log('Accepting connection: ' + sock.remoteAddress + ':' + sock.remotePort)

    // sock.write('Login server based on Node.js success!')
    var client = new Target(sock)
    clientList.push(client)
    setCurrentTarget(client.uuid)
    // client.commandQueue.push(1)
    // client.commandQueue.push(2)
    // 直到包接受结束才处理数据
    sock.on('data', function (dataPart) {
      data = Buffer.concat([data, dataPart])
      if (dataPart.length < 65525) {
        console.log(sock.remoteAddress + ':' + sock.remotePort + ' -> ' + data)
        processData(data, client)
        data = Buffer.alloc(0)
      }
    })

    sock.on('close', function (data) {
      console.log(sock.remoteAddress + ':' + sock.remotePort + ' logout!')
    })

    sock.on('error', function (error, data) {
      if (error) {
        console.log('Occurs an error: ' + error)
      }
    })
  })
  server.listen(serverPort, serverIP)
  console.log('server listening at ' + serverIP + ':' + serverPort)
  console.log('Waiting connection ... ...')
}

/**
 * @description: 停止服务
 */
export function stopServer () {
  if (server !== null) {
    server.close()
    server = null
  }
}

/**
 * @description: 获取当前靶机
 * @return {Target}
 */
export function getCurrentTarget () {
  for (let i = 0, len = clientList.length; i < len; i++) {
    if (clientList[i].uuid === targetUuid) {
      return clientList[i]
    }
  }
  return clientList[0]
}

/**
 * @description: 设置当前靶机
 * @param {String} uuid 靶机uuid
 */
export function setCurrentTarget (uuid) {
  targetUuid = uuid
}
