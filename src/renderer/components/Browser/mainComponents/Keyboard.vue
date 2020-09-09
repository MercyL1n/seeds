<template>
    <div>
      <p>Keyboard</p>
      <p><input type="text"></p>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'Keyboard',
  methods: {
    requestKeylogger () {
      ipcRenderer.once('updateKeylogger', (event, packet) => {
        alert('Vue:' + packet)
      })
      ipcRenderer.send('requestKeylogger', "start")
    },
    stopKeylogger () {
      ipcRenderer.once('keyloggerStop', (event, packet) => {
        alert('Vue:' + packet)
      })
      ipcRenderer.send('requestKeylogger', 'stop')
    }
  },
  mounted () {
    // this.requestKeylogger()
  }
}
</script>

<style scoped>

</style>
