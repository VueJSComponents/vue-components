import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import Gravatar from 'vue-gravatar';
import { sync } from 'vuex-router-sync';

Vue.config.productionTip = false;
Vue.component('v-gravatar', Gravatar);
const unsync = sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
