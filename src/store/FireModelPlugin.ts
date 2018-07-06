import { Store, ActionTree, MutationTree, Module, mapActions } from 'vuex';
import { IRootState } from '@/store';
import { FMEvents, IFMRecordEvent } from 'firemodel';
import { get } from 'lodash';
import { Package } from '@/models/Package';

const actions: ActionTree<IRootState, IRootState> = {
  [FMEvents.RECORD_ADDED]({ commit, rootState }, payload) {
    commit(FMEvents.RECORD_ADDED, {...payload, rootState}, { root: true });
  }
};

const mutations: MutationTree<IRootState> = {
  [FMEvents.RECORD_ADDED](state, payload: IFMRecordEvent<Package>) {
    if (!state) {
      (state as any) = [];
    }
    const id = payload.key;
    ((payload as any).rootState as IRootState).packages.all.push({...payload.value, ...{id}});
  }
};

const FireModelModule: Module<IRootState, IRootState> = {
  namespaced: false,
  actions,
  mutations
};

export const FireModelPlugin = (store: Store<IRootState>) => {
  // tslint:disable:no-console
  console.log('FireModel Vuex module registered (@firemodel)');
  console.log(FireModelModule);

  store.registerModule('@firemodel', FireModelModule, { preserveState: true });
};
