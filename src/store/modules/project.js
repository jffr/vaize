import { SET_PROJECT } from '../mutation-types';
import { GET_PROJECT } from '../action-types';
import data from '../../data';

export default {
  namespaced: false,
  state: {
    project: [],
  },
  mutations: {
    [SET_PROJECT](state, project) {
      state.project = project;
    },
  },
  actions: {
    [GET_PROJECT]({ commit }) {
      commit(SET_PROJECT, data.project);
    },
  },
  getters: {
    getProjectBySlug: state => (slug) => {
      if (!slug) return null;
      return state.project.find(a => a.slug === slug);
    },
    getRelatedProjects: state => (slug) => {
      if (!slug) return state.project;
      return [
        ...state.project.filter(a => a.slug !== slug),
      ].sort(() => 0.5 - Math.random());
    },
    hasProjects(state) {
      return state.project.length > 0;
    },
  },
};
