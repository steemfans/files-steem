import Vue from 'vue';
import App from './App.vue';
import VueShowdown from 'vue-showdown';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import { Row, Col, Table, TableColumn, Loading, Message } from 'element-ui';

Vue.config.productionTip = false;
Vue.use(VueShowdown, {
  options: {
    emoji: true,
  },
});
// Vue.use(ElementUI);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;

new Vue({
  render: h => h(App),
}).$mount('#app');
