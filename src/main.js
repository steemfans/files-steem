import { createApp } from 'vue';
import {
  ElCol,
  ElIcon,
  ElLoading,
  ElRow,
  ElTable,
  ElTableColumn,
} from 'element-plus';
import 'element-plus/es/components/col/style/css';
import 'element-plus/es/components/icon/style/css';
import 'element-plus/es/components/loading/style/css';
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/row/style/css';
import 'element-plus/es/components/table-column/style/css';
import 'element-plus/es/components/table/style/css';
import App from './App.vue';

const app = createApp(App);
app.use(ElRow);
app.use(ElCol);
app.use(ElTable);
app.use(ElTableColumn);
app.use(ElLoading);
app.use(ElIcon);
app.mount('#app');
