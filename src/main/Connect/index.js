import config from '../config'
// import { logger } from '../logger'
import { getCurrentTarget } from './server'

let target = null
var _packetID = 0
function createRequsetPayload (method, params) {
  var packetID = bufferWrite4(getPacketID())
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
    /* Register resolve callback and add sq to packet */
    target = getCurrentTarget()
    let payload = createRequsetPayload(method, params)
    resolve(payload)
    console.log(payload)
    console.log(payload.toString())
    // logger.debug(`Sending payload ${payload}`)
    /* Send payload */
    target.write(payload, () => setTimeout(() => {
      /* Report timeout when not receiving response after a specific timeout */
      reject(new Error('Response timeout'))
    }, timeout))
  })
}

export function handshake () {
  target = getCurrentTarget()
  var response = Buffer.alloc(8)
  response.write('PONG')
  target.write(response)
}

function getStatus (statusCode) {
  return config.statusCodes[statusCode.toString()]
}

export function processData (data) {
  if (data.slice(0, 4).toString() === 'PING') {
    handshake()
  } else {
    var packetID = data.slice(0, 4).readInt32LE()
    var statusCode = data.slice(4, 8).readInt32LE()
    var totalLength = data.slice(8, 12).readInt32LE()
    var content = data.slice(12, totalLength).toString()

    console.log(packetID)
    console.log(getStatus(statusCode))
    console.log(totalLength)
    console.log(content)
  }
}
