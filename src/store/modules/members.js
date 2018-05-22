import * as GoogleMapsClient from '@google/maps';
import HttpService from '../../api/HttpService';

import {
  GET_CELLS_ADDRESSES,
  GET_NEW_ATTENDERS,
  HIDE_DETAILS,
  LOCATE_MEMBER,
  RESET_STATE,
  SET_ATTENDER_COORDINATES,
  SET_CELLS_ADDRESSES,
  SET_CELL_COORDINATE,
  SET_GOOGLE_MAPS_CLIENT,
  SET_NEW_ATTENDERS,
  SHOW_DETAILS,
  SHOW_MAP_OPTIONS,
} from '../mutation-types';

export default {
  namespaced: true,
  state: {
    cellsAddresses: [],
    googleMapsClient: null,
    loading: false,
    newAttenders: [],
    person: null,
    shouldMapOptionsBeDisplayed: false,
  },
  mutations: {
    [GET_CELLS_ADDRESSES](state) {
      state.loading = false;
    },
    [GET_NEW_ATTENDERS](state) {
      state.loading = true;
    },
    [HIDE_DETAILS](state) {
      state.person = null;
    },
    [LOCATE_MEMBER](state, member) {
      state.memberToLocate = member;
    },
    [RESET_STATE](state) {
      state.memberCoordinates = null;
      state.memberToLocate = null;
    },
    [SET_CELLS_ADDRESSES](state, cells) {
      state.cells = cells;
    },
    [SET_CELL_COORDINATE](state, { index, coordinate }) {
      state.cellsAddresses[index].position = coordinate;
    },
    [SET_GOOGLE_MAPS_CLIENT](state) {
      state.googleMapsClient = GoogleMapsClient.createClient({
        key: 'AIzaSyAuANDgIy2xXINbsPiRLT8scXYfigQkV90',
      });
    },
    [SET_ATTENDER_COORDINATES](state, { index, coordinate }) {
      state.newAttenders[index].position = coordinate;
    },
    [SET_NEW_ATTENDERS](state, newAttenders) {
      state.newAttenders = newAttenders;
    },
    [SHOW_DETAILS](state, person) {
      state.person = person;
    },
    [SHOW_MAP_OPTIONS](state) {
      state.shouldMapOptionsBeDisplayed = true;
    },
  },
  actions: {
    async getCellsAddresses({ commit, state }) {
      commit(GET_CELLS_ADDRESSES);

      return HttpService.get('cell-leaders')
        .then(async (firstResponse) => {
          state.cellsAddresses = firstResponse.cells;

          /* eslint-disable */
          for (const index in firstResponse.cells) {
            if (firstResponse.cells[index].address
              && firstResponse.cells[index].address !== '') {
                state.googleMapsClient.geocode({
                  address: firstResponse.cells[index].address,
                }, (error, response) => {
                  commit(SET_CELL_COORDINATE, {
                    index,
                    coordinate: response.json.results[0].geometry.location,
                  });
                });
            }
          }
          /* eslint-enable */

          commit(GET_CELLS_ADDRESSES);
          return Promise.resolve(true);
        });
    },
    async getNewAttenders({ commit, state }) {
      commit(SET_GOOGLE_MAPS_CLIENT);
      commit(GET_NEW_ATTENDERS);

      return HttpService.get('new-attenders')
        .then(async (response) => {
          commit(SET_NEW_ATTENDERS, response.persons);

          /* eslint-disable */
          for (const index in response.persons) {
            await state.googleMapsClient.geocode({
              address: response.persons[index].address,
            }, (error, response) => {
              commit(SET_ATTENDER_COORDINATES, {
                index,
                coordinate: response.json.results[0].geometry.location,
              });
            });
          }
          /* eslint-enable */

          return Promise.resolve(true);
        });
    },
  },
};
