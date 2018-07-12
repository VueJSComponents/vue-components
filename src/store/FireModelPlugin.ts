// tslint:disable:no-console
import { Store, ActionTree, MutationTree, Module, mapActions } from 'vuex';
import { IRootState } from '@/store';
import { FMEvents, IFMRecordEvent, IFMRecordListEvent } from 'firemodel';
import { set } from 'lodash';
import { Package } from '@/models/Package';
import { IDictionary } from '../../../common-types/dist';



const actions: ActionTree<IRootState, IRootState> = {
  [FMEvents.RECORD_ADDED]({ commit, rootState }, payload: IFMRecordEvent) {
    commit(FMEvents.RECORD_ADDED, {...payload, rootState}, { root: true });
    commit(FMEvents.SINCE_UPDATED, {localPath: payload.localPath, rootState});
  },
  [FMEvents.RECORD_LIST]( { commit, rootState }, payload: IFMRecordListEvent) {
    commit(FMEvents.RECORD_LIST, {...payload, rootState});
    commit(FMEvents.SINCE_UPDATED, {localPath: payload.localPath, rootState});
  }
};

const mutations: MutationTree<IRootState> = {
  [FMEvents.RECORD_ADDED](state, payload: IFMRecordEvent<Package>) {
    if (!state) {
      (state as any) = [];
    }
    const id = payload.key;
    ((payload as any).rootState as IRootState).packages.all.push({...payload.value, ...{id}});
  },
  [FMEvents.SINCE_UPDATED](state, payload: IDictionary) {
    console.log('since updated running', payload.localPath);
    set(payload.rootState, payload.localPath.replace('all', 'since'), new Date().getTime());
  },
  [FMEvents.RECORD_LIST](state, payload: IFMRecordListEvent & { rootState: IRootState }) {
    set(payload.rootState, payload.localPath, payload.records);
    const mapping = payload.records.reduce((prev: IDictionary<number>, curr, idx: number) => {
      prev[curr.id] = idx;
      return prev;
    }, {});
    set(payload.rootState, payload.localPath.replace('all', 'byId'), mapping);
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

  store.registerModule('@firemodel', FireModelModule, { preserveState: true });
};
