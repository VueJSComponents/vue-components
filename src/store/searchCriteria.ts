import { MutationTree, ActionTree, ModuleTree, Module } from 'vuex';
import { IRootState } from '@/store';

export interface ISearchCriteria {
  name: string;
  tags: string[];
  stars: number;
  rating: number;
}

const state: ISearchCriteria = {
  name: '',
  tags: [],
  stars: 0,
  rating: 0
};

const mutations: MutationTree<ISearchCriteria> = {
  // tslint:disable:no-shadowed-variable
  filterByName(state, name: string) {
    state.name = name;
  },
  filterByStars(state, stars: number) {
    state.stars = stars;
  },
  FILTER_BY_RATING(state, rating: number) {
    state.rating = Number(rating);
  }
};

export const searchCriteria: Module<ISearchCriteria, IRootState> = {
  namespaced: true,
  state,
  mutations
};
