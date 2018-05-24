import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import Gravatar from 'vue-gravatar';

Vue.config.productionTip = false;
Vue.component('v-gravatar', Gravatar);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
