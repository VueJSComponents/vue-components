import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import Gravatar from 'vue-gravatar';
import { sync } from 'vuex-router-sync';
import { FireModel } from 'firemodel';
import { DB } from 'abstracted-client';
import { wait } from 'common-types';
import { VeuxWrapper } from '@/store/VuexWrapper';

Vue.config.productionTip = false;
Vue.component('v-gravatar', Gravatar);
const unsync = sync(store, router);

const config = {
  apiKey: 'AIzaSyCSgGc5m2SdkowLAHk2A2iV0IymNoTWB4Y',
  authDomain: 'vue-components.firebaseapp.com',
  databaseURL: 'https://vue-components.firebaseio.com',
  projectId: 'vue-components',
  storageBucket: 'vue-components.appspot.com',
  messagingSenderId: '342051144863'
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
