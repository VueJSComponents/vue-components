import { MutationTree, Module } from 'vuex';
import store, { IRootState } from '@/store';

export type ComponentTab = 'meta' | 'docs' | 'playground' | 'readme';
export interface ITransientState {
  distributionWidth: number;
  componentTab: ComponentTab;
}

const state: ITransientState = {
  distributionWidth: 300,
  componentTab: 'meta'
};

const mutations: MutationTree<ITransientState> = {
  // tslint:disable:no-shadowed-variable
  DISTRIBUTION_WIDTH(state, width: number) {
    state.distributionWidth = width;
  },
  SWITCH_COMPONENT_TAB(state, tab: ComponentTab) {
    state.componentTab = tab;
  }
};

export const transient: Module<ITransientState, IRootState> = {
  namespaced: true,
  state,
  mutations
};
