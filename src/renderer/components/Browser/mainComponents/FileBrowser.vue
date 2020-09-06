<template>
  <el-container>
    <el-aside width="20%" height="500px">
      <div>
        <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
    </el-aside>
    <el-main>
      <div>       
        <el-col :span="5" style="margin:5px;text-align: center" class="block" v-for="folder in folders" :key="folder">
          <img width='60px' src="/static/folder.png" alt=""><br>
          <span class="demonstration">{{folder}}</span>
        </el-col>
        <el-col :span="5" style="margin:5px;text-align: center" class="block" v-for="file in files" :key="file">
          <img width='60px'  src="/static/file.png" alt=""><br>
          <span class="demonstration">{{file}}</span>
        </el-col>
      </div>
    </el-main>
  </el-container>
</template>
<script>
  export default {
    name: 'FileBrowser',
    data () {
      return {
        tree: [{
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
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        folders: ['new folder', 'vue', 'electron', 'elementUI'],
        files: ['123.txt', 'flag', 'hello world.exe']
      }
      },  
    methods: {
      handleNodeClick (data) {
        console.log(data)
      }
    }
  }
</script>

<style>
.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}
</style>