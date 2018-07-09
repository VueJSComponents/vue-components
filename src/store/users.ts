import { IDictionary, fk } from 'common-types';
import { GetterTree, MutationTree, Module } from 'vuex';
import store, { IRootState } from '@/store';
import { User } from '@/models/User';

export interface IUsers {
  all: User[];
  /**
   * a hash of pointers which allows lookup up a userId and getting the
   * array index position within the "all" array
   */
  byId: IDictionary<number>;
  since?: number;
  /** indicates which user profile should be shown */
  show: fk | null;
  windowSize: number;
  page: number;
  selected?: fk;
}

const state: IUsers = {
  all: [],
  show: null,
  byId: {},
  windowSize: 20,
  page: 0
};

const getters: GetterTree<IUsers, IRootState> = {
  // tslint:disable:no-shadowed-variable
  lookupUser(state) {
    return (id: fk) => {
      const userIndex = state.byId[id];
      return userIndex ? state.all[userIndex] : {};
    };
  },
  selectedUser(state) {
    return state.show ? state.all[state.byId[state.show]] : {};
  }
};

const mutations: MutationTree<IUsers> = {
  selectUser(state, id: fk) {
    state.selected = id;
  },
  SHOW_USER_PROFILE(state, id: fk) {
    state.show = id;
  },
  HIDE_USER_PROFILE(state) {
    state.show = null;
  }
};

export const users: Module<IUsers, IRootState> = {
  namespaced: true,
  state,
  getters,
  mutations
};
