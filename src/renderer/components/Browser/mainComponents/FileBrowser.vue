<template>
  <el-container>
    <el-aside width="200px" height="500px">
      <div>
        <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
    </el-aside>
    <el-main>
      <el-table
          :data="fileListData"
          style="width: 100%"
          height="250"
          @row-dblclick="doubleClick"
          @row-contextmenu = "rightClick"
      >
        <el-table-column
            prop="Name"
            label="文件名称">
        </el-table-column>
        <el-table-column
            prop="Type"
            label="文件类型">
        </el-table-column>
        <el-table-column
            prop="WriteTime"
            label="修改时间">
        </el-table-column>
      </el-table>
      <div id="fileBrowserMenu">
        <div class="menu" v-for="(item,index) in menus" :key="index" @click.stop="infoClick(index)">{{ item }}</div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
let fileListDATA = [{
  Name: 'Windows',
  Type: 'folder',
  WriteTime: '2020-2-30-12:30'
}, {
  Name: 'exploer',
  Type: 'folder',
  WriteTime: '2020-2-30-12:30'
}, {
  Name: 'hello world',
  Type: 'folder',
  WriteTime: '2020-2-30-12:30'
}, {
  Name: 'file',
  Type: 'file',
  WriteTime: '2020-2-30-12:30'
}, {
  Name: '123',
  Type: 'file',
  WriteTime: '2020-2-30-12:30'
},]

let tableDATA = [{
  label: '一级 1',
  children: [{
    label: '二级 1-1',
    children: [{
      label: '三级 1-1-1'
    }]
  }]
}, {
  label: '一级 2',
  children: [{
    label: '二级 2-1',
    children: [{
      label: '三级 2-1-1'
    }]
  }, {
    label: '二级 2-2',
    children: [{
      label: '三级 2-2-1'
    }]
  }]
}, {
  label: '一级 3',
  children: [{
    label: '二级 3-1',
    children: [{
      label: '三级 3-1-1'
    }]
  }, {
    label: '二级 3-2',
    children: [{
      label: '三级 3-2-1'
    }]
  }]
}]

export default {
  name: 'FileBrowser',
  data() {
    return {
      menus: ['文件下载'],
      tree: tableDATA,
      fileListData: fileListDATA,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      folders: ['new folder', 'vue', 'electron', 'elementUI'],
      files: ['123.txt', 'flag', 'hello world.exe']
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    doubleClick(row, column, cell, event){
      this.$alert(row.Name, {
        confirmButtonText: '确定'
      });
      // todo 进入文件夹
      console.log(row.Name,column)
    },
    rightClick(row, column, event){
      var fileBrowserMenu = document.querySelector("#fileBrowserMenu");
      event.preventDefault();

      fileBrowserMenu.style.left = (event.clientX-200) + 'px';
      fileBrowserMenu.style.top = (event.clientY) + 'px';
      fileBrowserMenu.style.display = 'block';
      console.log(row, column);
      this.tableData.forEach((item, index) => {
        console.log(item.internel,row.internel)
        if (item.internel === row.internel) {
          this.currentRowIndex = index;
          return false;
        }
      })
    },
    infoClick(index) {
      this.$alert('当前table的下标为'+this.currentRowIndex ,'你点击了自定义菜单的'+this.menus[index]+'功能', {
        confirmButtonText: '确定',
        callback: action => {
          var targetMenu = document.querySelector("#targetMenu");
          targetMenu.style.display = 'none';
        }
      });
      if (this.menus[index]==='屏幕截图'){
        // todo Screenshot
      }
      if (this.menus[index]==='键盘记录'){
        // todo Keylogger
      }
      if (this.menus[index]==='文件目录'){
        // todo FileBrowser
      }
    },
  }
}
</script>

<style scoped>
#fileBrowserMenu {
  font-size: 12px;
  width: 100px;
  height: 25px;
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
