<template>
  <el-container>
    <el-main id="fileList">
      <el-row>
        <el-col style="padding-left: 3px;" :span="4">
          <div>
            <el-button size="mini" type="primary" icon="el-icon-arrow-left">返回上一层</el-button>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple-light">
            <el-breadcrumb separator="/" style="padding-left: 10px;padding-top: 7px">
              <el-breadcrumb-item>C</el-breadcrumb-item>
              <el-breadcrumb-item>Windows</el-breadcrumb-item>
              <el-breadcrumb-item>SYSTEM32</el-breadcrumb-item>
              <el-breadcrumb-item>dll</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
      </el-row>


      <el-table
          :data="fileListData"
          style="width: 100%"
          height="300"
          :row-class-name="tableRowClassName"
          @row-dblclick="doubleClick"
          @row-contextmenu="rightClick"
      >
        <el-table-column
            prop="Name"
            label="文件名称">
          <template slot-scope="scope">
            <i v-if="scope.row.Type=='folder'" class="el-icon-folder"></i>
            <i v-if="scope.row.Type=='file'" class="el-icon-document"></i>
            <span>{{scope.row.Name}}</span>
          </template>
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
      files: ['123.txt', 'flag', 'hello world.exe'],
      currentRowIndex: 0
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      row.index = rowIndex;
    },
    handleNodeClick(data) {
      console.log(data)
    },
    doubleClick(row, column, cell, event) {
      this.$alert(row.Name, {
        confirmButtonText: '确定'
      });
      // todo 进入文件夹
      console.log(row.Name, column)
    },
    rightClick(row, column, event) {
      var fileBrowserMenu = document.querySelector("#fileBrowserMenu");
      event.preventDefault();

      fileBrowserMenu.style.left = (event.clientX - 200) + 'px';
      fileBrowserMenu.style.top = (event.clientY - 60) + 'px';
      fileBrowserMenu.style.display = 'block';
      console.log(row, column);
      this.currentRowIndex = row.index
    },
    infoClick(index) {
      this.$alert(this.currentRowIndex + this.fileListData[this.currentRowIndex].Name + "  " + this.menus[index], {
        confirmButtonText: '确定',
        callback: action => {
          var fileBrowerMenu = document.querySelector("#fileBrowserMenu");
          fileBrowerMenu.style.display = 'none';
        }
      });
      if (this.menus[index] === '屏幕截图') {
        // todo Screenshot
      }
      if (this.menus[index] === '键盘记录') {
        // todo Keylogger
      }
      if (this.menus[index] === '文件目录') {
        // todo FileBrowser
      }
    },
  }
}
</script>

<style scoped>
#fileList {
  margin: 0;
  padding: 10px;
}

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
