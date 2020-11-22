import { SET_SERVICE } from '../mutation-types';
import { GET_SERVICE } from '../action-types';
import data from '../../data';

export default {
  namespaced: false,
  state: {
    service: {},
  },
  mutations: {
    [SET_SERVICE](state, service) {
      state.service = service;
    },
  },
  actions: {
    [GET_SERVICE]({ commit }) {
      commit(SET_SERVICE, data.service);
    },
  },
  getters: {
    hasServices(state) {
      return Object.keys(state.service).length > 0;
    },
  },
};
