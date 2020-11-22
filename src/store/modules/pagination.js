import { PAGINATION_INCREMENT, PAGINATION_PAGE_REGISTER, PAGINATION_PAGE_RESET } from '../action-types';
import { RESET_PAGINATION, INCREMENT_PAGINATION, REGISTER_PAGINATION } from '../mutation-types';

export default {
  namespaced: false,
  state: {
    pages: {},
  },
  mutations: {
    [REGISTER_PAGINATION](state, id) {
      if (!(id in state.pages)) {
        state.pages = Object.assign({}, state.pages, {
          [id]: 1,
        });
      }
    },
    [INCREMENT_PAGINATION](state, id) {
      state.pages = Object.assign({}, state.pages, {
        [id]: state.pages[id] + 1,
      });
    },
    [RESET_PAGINATION](state, id) {
      state.pages = Object.assign({}, state.pages, {
        [id]: 1,
      });
    },
  },
  actions: {
    [PAGINATION_PAGE_RESET]({ commit }, id) {
      commit(RESET_PAGINATION, id);
    },
    [PAGINATION_INCREMENT]({ commit }, id) {
      commit(INCREMENT_PAGINATION, id);
    },
    [PAGINATION_PAGE_REGISTER]({ commit }, id) {
      commit(REGISTER_PAGINATION, id);
    },
  },
};
