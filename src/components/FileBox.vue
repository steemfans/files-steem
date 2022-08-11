<template>
  <el-row>
    <el-col :span="24">
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          label="FileName"
          width="300">
          <template slot-scope="scope">
            <i class="el-icon-document"></i>
            <span style="margin-left: 10px">
              <a :href="scope.row.filePath" target="_blank">
                {{ scope.row.fileName }}
              </a>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="fileSize"
          label="Size"
          width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.fileSize">{{ scope.row.fileSize }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="fileTime"
          label="Date">
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'FileBox',
  data() {
    return {
      dataPath: 'https://files.steem.fans/s3',
      tableData: [],
      loading: false,
      currentPath: [],
    };
  },
  mounted() {
    this.getPaths();
  },
  methods: {
    getPaths() {
      this.loading = true;
      axios.get(this.dataPath, {})
        .then(res => {
          this.loading = false;
          if (res.status !== 200) {
            this.$message.error('get folder info error!');
          }
          this.tableData = this.parseXML(res.data);
        });
    },
    parseXML(xmlContent) {
      if (!xmlContent) return [];
      const parser = new DOMParser();
      const fileListDOM = parser.parseFromString(xmlContent, 'text/xml');
      const fileList = fileListDOM.getElementsByTagName('Contents');
      if (fileList.length === 0) return [];
      const result = [];
      fileList.forEach(f => {
        const fileInfo = {
          fileName: f.childNodes[0].innerHTML,
          fileType: 'file',
          filePath: `${this.dataPath}/${f.childNodes[0].innerHTML}`,
          fileTime: this.getMomentDate(f.childNodes[1].innerHTML),
          fileSize: this.getReadableSize(f.childNodes[3].innerHTML),
        };
        result.push(fileInfo);
      });
      return result;
    },
    getReadableSize(size) {
      var i = Math.floor(Math.log(size) / Math.log(1024));
      return (size / Math.pow(1024, i)).toFixed(2) * 1 + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    },
    getMomentDate(time) {
      var m = moment(new Date(time));
      return (time && m.isValid())? m.fromNow() : null;
    },
  },
}
</script>
