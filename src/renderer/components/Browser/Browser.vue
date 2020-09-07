<template>
  <div id="Browser" class="Browser">
      <el-container>
        <el-main>
            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
              <el-tab-pane name="first" label="文件查看"><FileBrowser/></el-tab-pane>
              <el-tab-pane name="second" label="键盘记录">键盘记录</el-tab-pane>
              <el-tab-pane name="third" label="屏幕截图">屏幕截图</el-tab-pane>
            </el-tabs>
        </el-main>
      </el-container>
  </div>
</template>

<script>
import FileBrowser from '../FileBrowser/FileBrowser'
import { connect } from '../../../main/Connect/connect'
import request from '../../../main/Connect/request/file'

export default {
  name: 'browser-page',
  components: {
    FileBrowser
  },
  data () {
    return {
      activeName: 'first'
    }
  },
  mounted () {
    connect()
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
      request.getFilePreview().then((packet) => {
        console.log(packet)
      })
      request.transFile('/User/flag').then((packet) => {
        console.log(packet)
      })
    },
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style>
.Browser {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
  height: 500px;
  overflow: overlay;
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  }
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius   : 10px;
  background-color: skyblue;
  background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
  )
  }
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background   : #ededed;
  border-radius: 10px;
  }
</style>