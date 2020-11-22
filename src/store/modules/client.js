import { SET_CLIENT } from '../mutation-types';
import { GET_CLIENT } from '../action-types';
import data from '../../data';

export default {
  namespaced: false,
  state: {
    client: {},
  },
  mutations: {
    [SET_CLIENT](state, client) {
      state.client = client;
    },
  },
  actions: {
    [GET_CLIENT]({ commit }) {
      commit(SET_CLIENT, data.client);
    },
  },
  getters: {
    hasClients(state) {
      return Object.keys(state.client).length > 0;
    },
  },
};
