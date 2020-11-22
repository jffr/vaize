import { SET_PRODUCTION } from '../mutation-types';
import { GET_PRODUCTION } from '../action-types';
import data from '../../data';

export default {
  namespaced: false,
  state: {
    production: {},
  },
  mutations: {
    [SET_PRODUCTION](state, production) {
      state.production = production;
    },
  },
  actions: {
    [GET_PRODUCTION]({ commit }) {
      commit(SET_PRODUCTION, data.production);
    },
  },
  getters: {
    hasProductionItems(state) {
      return state.production.length > 0;
    },
  },
};
