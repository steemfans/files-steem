import Vue from 'vue';
import App from './App.vue';
import VueShowdown from 'vue-showdown';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(VueShowdown, {
  options: {
    emoji: true,
  },
});
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app');
