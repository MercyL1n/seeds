import { clientList } from '../Connect/server'

export function disconnectTarget (target) {
  for (let i = 0, len = clientList.length; i < len; i++) {
    if (clientList[i] === target) {
      clientList.splice(i, i + 1)
      console.log('del ' + target.socket.remoteAddress + ':' + target.socket.remotePort)
      break
    }
  }
  updateTargetList()
}

export function getTargetList () {
  let targetList = []
  for (let i = 0, len = clientList.length; i < len; i++) {
    let client = clientList[i]
    targetList.push({
      uuid : client.uuid,
      ip : client.socket.remoteAddress,
      port : client.socket.remotePort,
      user : client.user,
      system: client.system
    })
  }
  return targetList
}
