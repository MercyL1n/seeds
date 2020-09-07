/**
 * 与靶机链接  stopServer
 */
import {startServer} from './server'
// const { logger } = require('../logger')
var { clientList } = require('./server')

export function connect () {
  /**
     * 与靶机建立连接
     */
  startServer()
}

export function getFileList () {
  /**
     *
     */
  if (clientList[0] != null && clientList[0].writable) {
    clientList[0].write('lmynb')
  }
}