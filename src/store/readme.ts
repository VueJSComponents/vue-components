import { Readme } from '@/models/Readme';
import { IDictionary, fk } from 'common-types';
import { GetterTree, Module } from 'vuex';
import { IRootState } from '@/store';

export interface IReadme {
  all: Readme[];
  byId: IDictionary<fk>;
}

const state: IReadme = {
  all: [],
  byId: {}
};

const getters: GetterTree<IReadme, IRootState> = {
  // tslint:disable:no-shadowed-variable
  selected(state, _, rootState) {
    return rootState.route.path.indexOf('component') !== -1 ? rootState.route.params.id : '';
  },
  selectedReadme(state, getters, rootState): Readme {
    const selected = getters.selected;
    return state.all[selected] || {
      html: '',
      htmlUrl: '',
      mdUrl: ''
    } as Readme;
  }
};

export const readme: Module<IReadme, IRootState> = {
  namespaced: true,
  state,
  getters
};
