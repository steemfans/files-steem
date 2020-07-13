<template>
  <el-row>
    <el-col :span="24">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'FileBox',
  data() {
    return {
      dataPath: 'https://files.steem.fans/data',
      tableData: [],
    };
  },
}
</script>