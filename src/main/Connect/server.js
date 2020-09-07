import { processData } from './index'
var net = require('net')
var serverIP = '127.0.0.1'
var serverPort = 10553

export var clientList = []
export let server = null
export function startServer () {
  if (server !== null) {
    server.close()
    server = null
  }
  server = net.createServer(function (sock) {
    console.log('Accepting connection: ' + sock.remoteAddress + ':' + sock.remotePort)

    sock.write('Login server based on Node.js success!')
    clientList.push(sock)
    sock.on('data', function (data) {
      console.log(sock.remoteAddress + ':' + sock.remotePort + ' -> ' + data)
      processData(data)
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


export function stopServer () {
  if (server !== null) {
    server.close()
    server = null
  }
}

export function getCurrentTarget () {
    return clientList[0]
}
