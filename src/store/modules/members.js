import * as GoogleMapsClient from '@google/maps';
import HttpService from '../../api/HttpService';

import {
  GET_CELLS_ADDRESSES,
  GET_NEW_ATTENDERS,
  LOCATE_MEMBER,
  RESET_STATE,
  SET_ATTENDER_COORDINATES,
  SET_CELLS_ADDRESSES,
  SET_CELL_COORDINATE,
  SET_GOOGLE_MAPS_CLIENT,
  SET_NEW_ATTENDERS,
} from '../mutation-types';

export default {
  namespaced: true,
  state: {
    cellsAddresses: [],
    googleMapsClient: null,
    newAttenders: [],
  },
  mutations: {
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
    [SET_ATTENDER_COORDINATES](state, { index, coordinates }) {
      state.newAttenders[index].position = coordinates;
    },
    [SET_NEW_ATTENDERS](state, newAttenders) {
      state.newAttenders = newAttenders;
    },
  },
  actions: {
    getCellsAddresses({ commit, state }) {
      commit(GET_CELLS_ADDRESSES);

      return HttpService.get('cells')
        .then(async (firstResponse) => {
          state.cellsAddresses = firstResponse.cells;

          /* eslint-disable */
          for (const index in firstResponse.cells) {
            state.googleMapsClient.geocode({
              address: firstResponse.cells[index].address,
            }, (error, response) => {
              commit(SET_CELL_COORDINATE, {
                index,
                coordinate: response.json.results[0].geometry.location,
              });
            });
          }
          /* eslint-enable */

          return Promise.resolve(true);
        });
    },
    getNewAttenders({ commit }) {
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
