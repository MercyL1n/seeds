<template>
  <el-table
    :data="tableData"
    border
    height="250"
    style="width: 100%">
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
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          externel: '123.122.14.156',
          internel: '192.168.110.130',
          listener: 'test',
          user:'admin',
          process:'beacon.exe'
        }, {
          externel: '123.122.14.156',
          internel: '192.168.110.130',
          listener: 'test',
          user:'admin',
          process:'beacon.exe'
        }, {
          externel: '123.122.14.156',
          internel: '192.168.110.130',
          listener: 'test',
          user:'admin',
          process:'beacon.exe'
        }, {
          externel: '123.122.14.156',
          internel: '192.168.110.130',
          listener: 'test',
          user:'admin',
          process:'beacon.exe'
        },{
          externel: '123.122.14.156',
          internel: '192.168.110.130',
          listener: 'test',
          user:'admin',
          process:'beacon.exe'
        }]
      }
    }
  }
</script>

<style>
.el-table__body-wrapper::-webkit-scrollbar{
    /*width: 0;宽度为0隐藏*/
    width: 0px;
}
.el-table__body-wrapper::-webkit-scrollbar-thumb{
    border-radius: 2px;
    height: 50px;
    background: #eee;
}
.el-table__body-wrapper::-webkit-scrollbar-track{
    overflow-x: hidden;
    overflow-y: hidden;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    background: rgba(0,0,0,0.4);
}
</style>