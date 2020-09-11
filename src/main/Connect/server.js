/*
 * @Auther: MercyLin
 * @Description: socket server启动与client管理
 * @Date: 2020-09-10 12:24:36
 * @LastEditors: MercyLin
 * @LastEditTime: 2020-09-11 16:00:03
 * @FilePath: \seeds\src\main\Connect\server.js
 */

import { processData } from './index'
import Target from '../TargetList/target'
var net = require('net')
const os = require('os');
var serverIP = getIPAddress()
var serverPort = 10553

export let targetUuid
export var clientList = []
export let server = null
let data = Buffer.alloc(0)
let tolalLength

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
      if (dataPart.slice(0, 4).toString() === 'PING') {
        console.log('shake')
        let tmp = getCurrentTarget()
        try {
          tmp.system = getSystemKind(dataPart.slice(8, 12).readInt32LE())
        } catch(err) {
          console.log(err)
        }
        handshake()
      } else {
        try {
          tolalLength = dataPart.slice(4, 8).readInt32LE()
        } catch {
          console.log("not head")
        }

        data = Buffer.concat([data, dataPart])
  
        if (data.length >= tolalLength) {
          console.log(sock.remoteAddress + ':' + sock.remotePort + 'data.length: -> ' + data.length)
          processData(data, client)
          data = Buffer.alloc(0)
        }
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


///获取本机ip///
function getIPAddress(){
  var interfaces = require('os').networkInterfaces();
  for(var devName in interfaces){
      var iface = interfaces[devName];
      for(var i=0;i<iface.length;i++){
          var alias = iface[i];
          // console.log(JSON.stringify(alias))
          if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal && alias.address.indexOf('10.') === 0){
              return alias.address;
          }
      }
  }
}

/**
 * @description: 握手
 */
export function handshake () {
  target = getCurrentTarget().socket
  var response = Buffer.alloc(8)
  response.write('PONG')
  target.write(response)
}

/**
 * @description: 获取系统种类
 * @param {Number} systemKindCode 系统种类码
 * @return {String}
 */
function getSystemKind (systemKindCode) {
  return config.systemKind[systemKindCode]
}