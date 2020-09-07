import { sendRequest } from '../index'

export default{
    startShell: () => sendRequest('shell', {method: 'start'}),
    stopShell: () => sendRequest('shell', {method: 'stop'}),
    sendCommand: (cmdlines) => sendRequest('sendCommand' , {cmd: cmdlines})
}