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
          <template #default="{ row }">
            <el-icon><Document /></el-icon>
            <span style="margin-left: 10px">
              <a :href="row.filePath" target="_blank">
                {{ row.fileName }}
              </a>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="fileSize"
          label="Size"
          width="100">
          <template #default="{ row }">
            <span v-if="row.fileSize">{{ row.fileSize }}</span>
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
import { ElMessage } from 'element-plus';
import { Document } from '@element-plus/icons-vue';

const RELATIVE_DIVISIONS = [
  { amount: 60, unit: 'second' },
  { amount: 60, unit: 'minute' },
  { amount: 24, unit: 'hour' },
  { amount: 7, unit: 'day' },
  { amount: 4.34524, unit: 'week' },
  { amount: 12, unit: 'month' },
  { amount: Number.POSITIVE_INFINITY, unit: 'year' },
];

export default {
  name: 'FileBox',
  components: {
    Document,
  },
  data() {
    return {
      dataPath: 'https://files.steem.fans/data',
      downloadPath: 'https://files.steem.fans/hetzner',
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
            ElMessage.error('get folder info error!');
          }
          this.tableData = this.parseJSON(res.data);
        })
        .catch(() => {
          this.loading = false;
          ElMessage.error('get folder info error!');
        });
    },
    parseJSON(jsonContent) {
      if (!jsonContent) return [];
      const tmp = [];
      jsonContent.forEach(f => {
        if (f.type !== 'file') return;
        tmp.push({
          fileName: f.name,
          fileType: f.type,
          filePath: `${this.downloadPath}/${f.name}`,
          fileTime: this.getRelativeDate(f.mtime),
          fileSize: this.getReadableSize(f.size),
        });
      });
      return tmp;
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
          fileTime: this.getRelativeDate(f.childNodes[1].innerHTML),
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
    getRelativeDate(time) {
      const date = new Date(time);
      if (!time || Number.isNaN(date.getTime())) return null;
      const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
      let duration = (date.getTime() - Date.now()) / 1000;
      for (const division of RELATIVE_DIVISIONS) {
        if (Math.abs(duration) < division.amount) {
          return rtf.format(Math.round(duration), division.unit);
        }
        duration /= division.amount;
      }
      return null;
    },
  },
}
</script>
