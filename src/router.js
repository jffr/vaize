import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'navbar__menu__item__link--active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/projects/:slug',
      name: 'projects',
      component: () => import(/* webpackChunkName: "project" */ './views/Project.vue'),
    },
    {
      path: '/projects',
      redirect: '/',
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.path === from.path) return null;
    return { x: 0, y: 0 };
  },
});

export default router;
