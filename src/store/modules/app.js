import filter from 'lodash/filter';
import find from 'lodash/find';

import IconsList from '../../static/iconsList';
import MarkerBlue from '../../assets/img/icons/marker-blue.png';
import MarkerOrange from '../../assets/img/icons/marker-orange.png';

import {
  LOAD_ICONS_TO_SELECT,
  SET_CELL_ICON,
  SET_NEW_ATTENDERS_ICON,
} from '../mutation-types';

export default {
  namespaced: true,
  state: {
    cellIconPath: MarkerOrange,
    iconsListToSelect: [],
    newAttenderIconPath: MarkerBlue,
  },
  mutations: {
    [LOAD_ICONS_TO_SELECT](state) {
      const filteredIcons = filter(IconsList, iconItem =>
        (iconItem !== state.cellIconPath && iconItem !== state.newAttenderIconPath));

      state.iconsListToSelect = filteredIcons;
    },
    [SET_CELL_ICON](state, icon) {
      const iconFound = find(IconsList, iconItem => (iconItem === icon));

      if (iconFound) {
        state.cellIconPath = iconFound;
      } else {
        state.cellIconPath = MarkerOrange;
      }

      localStorage.setItem('cellIcon', state.cellIconPath);
    },
    [SET_NEW_ATTENDERS_ICON](state, icon) {
      const iconFound = find(IconsList, iconItem => (iconItem === icon));

      if (iconFound) {
        state.newAttenderIconPath = iconFound;
      } else {
        state.newAttenderIconPath = MarkerBlue;
      }

      localStorage.setItem('newMemberIcon', state.newAttenderIconPath);
    },
  },
  actions: {
    loadIcons({ commit }) {
      const cellIcon = localStorage.getItem('cellIcon');
      commit(SET_CELL_ICON, cellIcon);

      const newMemberIcon = localStorage.getItem('newMemberIcon');
      commit(SET_NEW_ATTENDERS_ICON, newMemberIcon);
    },
  },
};
