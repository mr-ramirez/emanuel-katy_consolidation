import HttpService from '../../api/HttpService';

import {
  GET_NEW_MEMBERS,
  SET_NEW_MEMBERS,
} from '../mutation-types';

export default {
  namespaced: true,
  state: {
    newMembers: [],
  },
  mutations: {
    [SET_NEW_MEMBERS](state, newMembers) {
      state.newMembers = newMembers;
    },
  },
  actions: {
    getNewMembers({ commit }) {
      commit(GET_NEW_MEMBERS);

      return HttpService.get('new-members')
        .then((response) => {
          commit(SET_NEW_MEMBERS, response.persons);
          return true;
        });
    },
  },
};
