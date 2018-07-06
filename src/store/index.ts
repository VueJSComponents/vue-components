import Vue from 'vue';
import Vuex, { Payload, Store } from 'vuex';
import { FireModelPlugin } from '@/store/FireModelPlugin';
import { ISearchCriteria, searchCriteria } from '@/store/searchCriteria';
import { IPackages, packages } from '@/store/packages';
import { ISnackbar, snackbar } from '@/store/snackbar';
import { IUsers, users } from '@/store/users';
import VuexPersistence from 'vuex-persist';

const localStorage = new VuexPersistence<IRootState, Payload>({
  storage: window.localStorage,
  reducer: state => ({ packages: state.packages, users: state.users })
});

Vue.use(Vuex);

export interface IRootState {
  packages: IPackages;
  users: IUsers;
  searchCriteria: ISearchCriteria;
  snackbar: ISnackbar;
  route: any;
}

export default new Vuex.Store<IRootState>({
  modules: {
    packages,
    users,
    searchCriteria,
    snackbar
  },
  plugins: [FireModelPlugin, localStorage.plugin]
});
