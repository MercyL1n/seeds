export function fileNotFound () {
  console.log('file dose not exist')
}

export function updateFilepreview (content) {
  console.log('updateFilepreview: ' + content)
}

export function saveFile (file) {
  var path = require("path")
  var fs = require('fs')
  var url = path.resolve('./')
  console.log('2333' + url)
  
  let fileName = "flag.png"
  fs.writeFileSync(`./${fileName}`, file , function(error){
    if (error) {
      console.log('啊这')
    } else {
      console.log('写入成功')
    }
  })
  return url + '\\' + fileName
}
