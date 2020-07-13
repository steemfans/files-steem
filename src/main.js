import Vue from 'vue';
import App from './App.vue';
import VueShowdown from 'vue-showdown';

Vue.config.productionTip = false;
Vue.use(VueShowdown, {
  options: {
    emoji: true,
  },
});

new Vue({
  render: h => h(App),
}).$mount('#app');
