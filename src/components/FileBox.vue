<template>
  <el-row>
    <el-col :span="24">
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        @row-click="rowClick"
        style="width: 100%">
        <el-table-column
          label="FileName"
          width="300">
          <template slot-scope="scope">
            <i class="el-icon-document" v-if="scope.row.fileType === 'flie'"></i>
            <span style="margin-left: 10px">
              <a :href="getUrl(scope.row)" target="_blank">
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
      dataPath: 'https://files.steem.fans/data',
      tableData: [],
      loading: false,
      currentPath: [],
    };
  },
  mounted() {
    this.getPaths();
  },
  methods: {
    getUrl(row) {
      if (row.fileType === 'file') {
        return row.filePath;
      }
      return '#';
    },
    getPaths(fpath = '') {
      this.loading = true;
      let api;
      if (fpath !== '') {
        api = fpath;
      } else {
        api = `${this.dataPath}`;
      }
      this.currentPath.push(api);
      axios.get(api, {})
        .then(res => {
          this.loading = false;
          if (res.status !== 200) {
            this.$message.error('get folder info error!');
          }
          const tmp = [];
          if (fpath !== '') {
            const tmpPath = this.currentPath;
            tmpPath.pop();
            tmp.push({
              fileName: 'Prev ..',
              fileType: 'prev',
              filePath: tmpPath.pop(),
              fileTime: null,
              fileSize: null,
            });
          }
          res.data.forEach(f => {
            tmp.push({
              fileName: f.name,
              fileType: f.type,
              filePath: `${api}/${f.name}`,
              fileTime: this.getMomentDate(f.mtime),
              fileSize: this.getReadableSize(f.size),
            });
          });
          this.tableData = tmp;
        });
    },
    getReadableSize(size) {
      var i = Math.floor(Math.log(size) / Math.log(1024));
      return (size / Math.pow(1024, i)).toFixed(2) * 1 + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    },
    getMomentDate(time) {
      var m = moment(new Date(time));
      return (time && m.isValid())? m.fromNow() : null;
    },
    rowClick(row) {
      if (row.fileType === 'file') {
        // window.open(row.filePath);
      } else {
        this.getPaths(row.filePath);
      }
    },
  },
}
</script>
