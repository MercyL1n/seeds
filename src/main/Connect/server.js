import { processData } from './index'
import Target from '../TargetList/target'
var net = require('net')
var serverIP = '10.122.222.168'
var serverPort = 10553

export let targetUuid
export var clientList = []
export let server = null
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
    sock.on('data', function (data) {
      console.log(sock.remoteAddress + ':' + sock.remotePort + ' -> ' + data)
      processData(data, client)
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
  for (let i = 0, len = clientList.length; i < len; i++) {
    if (clientList[i].uuid === targetUuid) {
      return clientList[i]
    }
  }
  return clientList[0]
}

export function setCurrentTarget (uuid) {
  targetUuid = uuid
}
