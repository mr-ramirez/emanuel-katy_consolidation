<template>
  <div class="modal fade" id="myModal" tabindex="-1"
    role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Localización</h5>
          <button type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            v-on:click="resetState()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <GmapMap
            :center="{lat:29.761993, lng:-95.366302}"
            :zoom="9"
            style="width: 465px; height: 300px"
            v-if="memberToLocate !== null && memberCoordinates !== null"
          >
            <GmapMarker
              :position="memberCoordinates"
              :clickable="true"
              :draggable="false"
              :shape="shape"
              v-if="memberToLocate !== null && memberCoordinates !== null"
              :icon="newMemberIconPath"
            />

            <GmapMarker
              v-if="areCellsCoordinatesSet()"
              v-for="(cell, index) in cellsAddresses"
              :key="index"
              :position="cell.position"
              :clickable="true"
              :draggable="false"
              :label="`${cell.firstName} ${cell.lastName}`"
            />
          </GmapMap>
        </div>
        <div class="modal-footer">
          <button type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            v-on:click="resetState()">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { find } from 'lodash';
  import { mapMutations, mapState } from 'vuex';

  import NewMemberIcon from '../assets/logo.png';
  import { RESET_STATE } from '../store/mutation-types';

  export default {
    name: 'locator',
    computed: {
      ...mapState('members', [
        'cellsAddresses',
        'memberCoordinates',
        'memberToLocate',
      ]),
    },
    data() {
      return {
        center: {
          lat: 10,
          lng: 10,
        },
        newMemberIconPath: NewMemberIcon,
        shape: {
          type: 'info',
        },
      };
    },
    methods: {
      ...mapMutations('members', {
        resetState: RESET_STATE,
      }),
      areCellsCoordinatesSet() {
        const cellWithNoCoordinate = find(
          this.cellsAddresses,
          cell => (cell.position !== undefined),
        );
        return cellWithNoCoordinate !== undefined;
      },
    },
    props: {
      member: Object,
    },
  };
</script>

<style>

</style>
