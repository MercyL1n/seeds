<template>
  <el-container>
    <el-aside width="400px">
      <el-table
          :data="tableData"
          border
          style="width: 100%;height:500px">
        <el-table-column
            prop="User"
            label="User">
        </el-table-column>
        <el-table-column
            prop="computer"
            label="computer">
        </el-table-column>
        <el-table-column
            prop="pid"
            label="pid">
        </el-table-column>
        <el-table-column
            prop="when"
            label="when">
        </el-table-column>
      </el-table>
    </el-aside>
    <el-main style="margin: 0;padding: 0;">

    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Screenshots',
  data (){
    return {
      tableData: [
        {
          User: 'pyfsg',
          computer: 'WIN-J7LSRN82JKR',
          pid: '2912',
          when: '2020-13-32'
        },
        {
          User: 'pyfsg',
          computer: 'WIN-J7LSRN82JKR',
          pid: '2912',
          when: '2020-13-32'
        },
        {
          User: 'pyfsg',
          computer: 'WIN-J7LSRN82JKR',
          pid: '2912',
          when: '2020-13-32'
        }
      ],
      keylogs: [
        {
          program: '新建文本文档 - 记事本',
          key: 'ASDDSFGWEQRSDFdsafwerqwe'
        },
        {
          program: 'System',
          key: 'A2143453243122412213e'
        }, {
          program: 'Microsoft Edge',
          key: '123532assdfsdfsdfsdfasads'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
