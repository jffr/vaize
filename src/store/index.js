import Vue from 'vue';
import Vuex from 'vuex';
import portfolio from './modules/portfolio';
import service from './modules/service';
import production from './modules/production';
import review from './modules/review';
import project from './modules/project';
import client from './modules/client';
import pagination from './modules/pagination';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: 'Vaize Studio',
  },
  modules: {
    portfolio,
    service,
    production,
    review,
    project,
    client,
    pagination,
  },
});
