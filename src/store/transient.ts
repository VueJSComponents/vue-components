import { MutationTree, Module } from 'vuex';
import store, { IRootState } from '@/store';

export interface ITransientState {
  distributionWidth: number;
}

const state: ITransientState = {
  distributionWidth: 300
};

const mutations: MutationTree<ITransientState> = {
  // tslint:disable:no-shadowed-variable
  DISTRIBUTION_WIDTH(state, width: number) {
    state.distributionWidth = width;
  }
};

export const transient: Module<ITransientState, IRootState> = {
  namespaced: true,
  state,
  mutations
};
