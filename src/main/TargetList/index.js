import { clientList } from '../Connect/server'
export function updateTargetList () {

}

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
