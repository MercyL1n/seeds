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
  name: 'Screenshots'
}
</script>

<style scoped>

</style>
