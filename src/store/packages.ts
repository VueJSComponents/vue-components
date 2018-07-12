import { IDictionary, fk } from 'common-types';
import { Package } from '@/models/Package';
import { GetterTree, MutationTree, Module } from 'vuex';
import store, { IRootState } from '@/store';
import { namespace } from 'vuex-class';

export interface IPackages {
  all: Package[];
  since?: number;
  byId?: IDictionary<fk>;
  currentWindow: Package[];
  windowSize: number;
  favorites: Package[];
  recent: Package[];
  selected?: fk;
}

const state: IPackages = {
  all: [],
  byId: {},
  favorites: [],
  currentWindow: [],
  windowSize: 20,
  recent: []
};

const getters: GetterTree<IPackages, IRootState> = {
  // tslint:disable:no-shadowed-variable
  selected(state, _, rootState): string {
    return rootState.route.path.indexOf('component') !== -1 ? rootState.route.params.id : '';
  },
  filteredPackages(state): Package[] {
    const selectOn = store.state.searchCriteria;
    const all = state.all;
    const selected = state.selected;
    let filtered = selectOn.name
      ? all.filter(i => i.id.indexOf(selectOn.name) !== -1 || state.selected === i.id)
      : all;
    filtered =
      selectOn.rating !== undefined
        ? filtered.filter(i => i.score.final >= selectOn.rating)
        : filtered;
    filtered = selectOn.stars ? filtered.filter(i => i.starsCount >= selectOn.stars) : filtered;

    filtered =
      selectOn.tags.length > 0
        ? (filtered = filtered.filter(i => selectOn.tags.every(t => i.mappedKeywords.includes(t))))
        : filtered;

    return filtered;
  },
  selectedPackage(state) {
    const pkgs = store.getters['packages/filteredPackages'];
    const selected = store.getters['packages/selected'];

    const pkg = pkgs.filter((i: Package) => i.id === selected);
    return pkg[0];
  }
};

const mutations: MutationTree<IPackages> = {
  selectPackage(state, id: fk) {
    state.selected = id;
  },
  UPDATE_SINCE(state, timestamp?: number | string) {
    if (!timestamp) {
      timestamp = new Date().getTime();
    } else if (typeof timestamp === 'string') {
      timestamp = new Date(timestamp).getTime();
    }
    state.since = timestamp;
  }
};

export const packages: Module<IPackages, IRootState> = {
  namespaced: true,
  state,
  getters,
  mutations
};
