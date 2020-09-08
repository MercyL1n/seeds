export default class target {
    isShellConnected = false
    socket
    filepreviewQueue = []
    screenShotQueue = []
    fileQueue = []
    commandQueue = []
    constructor(socket) {
        this.socket = socket
    }
}