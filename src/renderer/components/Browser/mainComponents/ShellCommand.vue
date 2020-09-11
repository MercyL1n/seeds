<!--
 * @Auther: MercyLin
 * @Description: description
 * @Date: 2020-09-11 11:27:19
 * @LastEditors: MercyLin
 * @LastEditTime: 2020-09-11 18:29:02
 * @FilePath: \seeds\src\renderer\components\Browser\mainComponents\ShellCommand.vue
-->
<template>
  <div>
    <el-input
      style="backgrond-color:'#2b2d42'"
      type="textarea"
      :autosize="{ minRows: 16, maxRows: 100}"
      placeholder="请输入命令"
      v-model="textarea"
      @keyup.enter.native="sendCommand">
    </el-input>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'ShellCommand',
  data () {
    return {
      textarea: ''
    }
  },
  methods: {
    /**
     * @description: 请求shell
     * @return {boolean} status shell连接状态
     */
    requestShell () {
      ipcRenderer.once('getShell', (event, status) => {
        alert('Vue:' + status)
      })
      ipcRenderer.send('requestShell', 'start')
    },
    /**
     * @description: 请求断开shell
     * @return {boolean} status shell连接状态
     */
    stopShell () {
      ipcRenderer.once('stopShell', (event, status) => {
        alert('Vue:' + status)
      })
      ipcRenderer.send('requestShell', 'stop')
    },
    /**
     * @description: 发送shell指令
     * @param {string} commandLines 命令行
     * @return {string} shell指令回复
     */
    sendCommand (commandLines) {
      ipcRenderer.once('commandSended', (event, res) => {
        alert('Vue:' + res)
      })
      ipcRenderer.send('sendCommand', commandLines)
    }
  }
}
</script>

<style>
.el-input::-webkit-input-placeholder{
  background-color: "#2b2d42" !important;
}
</style>
