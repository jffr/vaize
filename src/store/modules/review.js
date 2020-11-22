import { SET_REVIEW } from '../mutation-types';
import { GET_REVIEW } from '../action-types';
import data from '../../data';

export default {
  namespaced: false,
  state: {
    review: {},
  },
  mutations: {
    [SET_REVIEW](state, review) {
      state.review = review;
    },
  },
  actions: {
    [GET_REVIEW]({ commit }) {
      commit(SET_REVIEW, data.review);
    },
  },
  getters: {
    hasReviews(state) {
      return Object.keys(state.review).length > 0;
    },
  },
};
