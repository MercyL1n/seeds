export function shellConnect(target, status) {
  target.isShellConnected = status
  console.log('shell ' + (status ? 'connected': 'disconnected'))
}

export function updateShellResponse(response){
  console.log("get responese: " + response)
}