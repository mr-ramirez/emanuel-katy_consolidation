import Vue from 'vue';
import Router from 'vue-router';

import GeneralMap from '../components/GeneralMap.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      component: GeneralMap,
      name: 'GeneralMap',
      path: '/',
    },
  ],
  scrollBehavior: () => ({ x: 0, y: 0 }),
});
