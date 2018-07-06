import { IDictionary, fk } from 'common-types';
import { GetterTree, MutationTree, Module } from 'vuex';
import store, { IRootState } from '@/store';
import { User } from '@/models/User';

export interface IUsers {
  all: User[];
  windowSize: number;
  page: number;
  selected?: fk;
}

const state: IUsers = {
  all: [],
  windowSize: 20,
  page: 0
};

const mutations: MutationTree<IUsers> = {
  // tslint:disable-next-line:no-shadowed-variable
  selectUser(state, id: fk) {
    state.selected = id;
  }
};

export const users: Module<IUsers, IRootState> = {
  namespaced: true,
  state,
  mutations
};
