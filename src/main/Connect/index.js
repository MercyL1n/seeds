import config from '../config'
import { logger } from '../logger'
var { clientList } = require('./server')

let target = null
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
  return 1
}
export function sendRequest (method, params = null, timeout = config.connection.RESPONSE_TIMEOUT) {
  return new Promise((resolve, reject) => {
    if (clientList === null) {
      reject(new Error('Not connected'))
    }
    /* Register resolve callback and add sq to packet */
    target = getCurrentTarget()
    let payload = createRequsetPayload(method, params)
    resolve(payload)
    console.log(payload)
    console.log(payload.toString())
    logger.debug(`Sending payload ${payload}`)
    /* Send payload */
    target.write(payload, () => setTimeout(() => {
      /* Report timeout when not receiving response after a specific timeout */
      reject(new Error('Response timeout'))
    }, timeout))
  })
}

export function getCurrentTarget () {
  return clientList[0]
}
