import { Module, MutationTree } from 'vuex';
import { IRootState } from '@/store';
import { Omit } from 'common-types';

export interface ISnackbar {
  text: string;
  display: boolean;
  timeout?: number;
  verticalPosition?: 'top' | 'bottom';
  horizontalPosition?: 'left' | 'right';
}

const state: ISnackbar = {
  display: false,
  text: '',
  timeout: 6000,
  verticalPosition: 'bottom'
};

const mutations: MutationTree<ISnackbar> = {
  // tslint:disable:no-shadowed-variable
  CLOSE_SNACKBAR(state) {
    state.display = false;
  },
  DISPLAY_SNACK(state, config: Omit<ISnackbar, 'display'>) {
    state = { display: state.display, ...config };
  }
};

export const snackbar: Module<ISnackbar, IRootState> = {
  namespaced: true,
  state,
  mutations
};
