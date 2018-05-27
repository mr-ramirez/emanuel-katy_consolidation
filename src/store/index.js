import Vue from 'vue';
import Vuex from 'vuex';

import main from './modules/main';
import members from './modules/members';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    main,
    members,
  },
});
