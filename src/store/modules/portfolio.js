import { SET_PORTFOLIO_ITEMS, SET_PORTFOLIO_CATEGORIES, SET_PORTFOLIO_CURRENT_ID } from '../mutation-types';
import {
  GET_PORTFOLIO_ITEMS,
  SET_ACTIVE_PORTFOLIO_ITEM,
  SET_PORTFOLIO_ITEM_NEXT,
  SET_PORTFOLIO_ITEM_PREVIOUS,
} from '../action-types';
import data from '../../data';

export default {
  namespaced: false,
  state: {
    items: [],
    categories: [],
    currentId: null,
  },
  mutations: {
    [SET_PORTFOLIO_ITEMS](state, items) {
      state.items = items;
    },
    [SET_PORTFOLIO_CATEGORIES](state, categories) {
      state.categories = categories;
    },
    [SET_PORTFOLIO_CURRENT_ID](state, id) {
      state.currentId = id;
    },
  },
  actions: {
    [GET_PORTFOLIO_ITEMS]({ commit }) {
      commit(SET_PORTFOLIO_ITEMS, data.portfolio);
      commit(SET_PORTFOLIO_CATEGORIES, data.portfolioCategory);
    },
    [SET_ACTIVE_PORTFOLIO_ITEM]({ commit }, id) {
      commit(SET_PORTFOLIO_CURRENT_ID, id);
    },
    [SET_PORTFOLIO_ITEM_NEXT]({ commit, state }) {
      const currentIndex = state.items.findIndex(el => el.id === state.currentId);
      const nextIndex = currentIndex + 1;

      // Check if there's a next item in the array
      if (nextIndex === state.items.length) return;

      // Set the next active id
      commit(SET_PORTFOLIO_CURRENT_ID, state.items[nextIndex].id);
    },
    [SET_PORTFOLIO_ITEM_PREVIOUS]({ commit, state }) {
      const currentIndex = state.items.findIndex(el => el.id === state.currentId);
      if (currentIndex === 0) return;

      // Set the previous active id
      commit(SET_PORTFOLIO_CURRENT_ID, state.items[currentIndex - 1].id);
    },
  },
  getters: {
    getPortfolioByCategoryId: state => (categoryId) => {
      if (!categoryId) return state.items;
      return state.items.filter(p => p.categoryIds.includes(categoryId));
    },
    hasPortfolioItems(state) {
      return state.items.length > 0 || state.categories.length > 0;
    },
    currentPortfolioItem(state) {
      if (state.currentId === null) return null;
      return state.items.find(el => el.id === state.currentId);
    },
    hasPreviousPortfolioItem(state) {
      if (state.currentId === null) return false;
      const index = state.items.findIndex(el => el.id === state.currentId);
      return index > 0;
    },
    hasNextPortfolioItem(state) {
      if (state.currentId === null) return false;
      const index = state.items.findIndex(el => el.id === state.currentId);
      return index < state.items.length - 1;
    },
  },
};
