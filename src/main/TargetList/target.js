export default class Target {
    isShellConnected = false
    socket
    user = 'guest'
    system = 'windows 2077'
    filepreviewQueue = []
    screenShotQueue = []
    fileQueue = []
    commandQueue = []
    constructor (socket) {
      this.socket = socket
    }
}
