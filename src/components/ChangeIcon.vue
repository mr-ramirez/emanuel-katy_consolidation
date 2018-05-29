<template>
  <div class="modal fade" id="changeIcon" tabindex="-1"
    role="dialog" aria-labelledby="changeIconLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-light" id="exampleModalLabel">Seleccione un ícono</h5>
          <button type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close">
            <span class="text-white" aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" v-if="iconsListToSelect.length !== 0">
          <div class="row mb-3">
            <div class="col-2">
              <img :src="iconsListToSelect[0]" width="50"
                v-on:click="selectIcon(iconsListToSelect[0])" />
            </div>
            <div class="col-2">
              <img :src="iconsListToSelect[1]" width="50"
                v-on:click="selectIcon(iconsListToSelect[1])" />
            </div>
            <div class="col-2">
              <img :src="iconsListToSelect[2]" width="50"
                v-on:click="selectIcon(iconsListToSelect[2])" />
            </div>
            <div class="col-2">
              <img :src="iconsListToSelect[3]" width="50"
                v-on:click="selectIcon(iconsListToSelect[3])" />
            </div>
            <div class="col-2">
              <img :src="iconsListToSelect[4]" width="50"
                v-on:click="selectIcon(iconsListToSelect[4])" />
            </div>
            <div class="col-2">
              <img :src="iconsListToSelect[5]" width="50"
                v-on:click="selectIcon(iconsListToSelect[5])" />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-2">
              <img :src="iconsListToSelect[6]" width="50"
                v-on:click="selectIcon(iconsListToSelect[6])" />
            </div>
            <div class="col-2">
              <img :src="iconsListToSelect[7]" width="50"
                v-on:click="selectIcon(iconsListToSelect[7])" />
            </div>
            <div class="col-2">
              <img :src="iconsListToSelect[8]" width="50"
                v-on:click="selectIcon(iconsListToSelect[8])" />
            </div>
            <div class="col-2">
              <img :src="iconsListToSelect[9]" width="50"
                v-on:click="selectIcon(iconsListToSelect[9])" />
            </div>
            <div class="col-2">
              <img :src="iconsListToSelect[10]" width="50"
                v-on:click="selectIcon(iconsListToSelect[10])" />
            </div>
            <div class="col-2">
              <img :src="iconsListToSelect[11]" width="50"
                v-on:click="selectIcon(iconsListToSelect[11])" />
            </div>
          </div>
          <div class="row">
            <div class="col-2">
              <img :src="iconsListToSelect[12]" width="50"
                v-on:click="selectIcon(iconsListToSelect[12])" />
            </div>
            <div class="col-2">
            </div>
            <div class="col-2">
            </div>
            <div class="col-2">
            </div>
            <div class="col-2">
            </div>
            <div class="col-2">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';

  import {
    LOAD_ICONS_TO_SELECT,
    SET_CELL_ICON,
    SET_NEW_ATTENDERS_ICON,
  } from '../store/mutation-types';

  export default {
    name: 'ChangeIcon',
    computed: {
      ...mapState('app', [
        'iconsListToSelect',
      ]),
    },
    methods: {
      ...mapMutations('app', {
        loadIconsToSelect: LOAD_ICONS_TO_SELECT,
        setCellIcon: SET_CELL_ICON,
        setNewAttendersIcon: SET_NEW_ATTENDERS_ICON,
      }),
      selectIcon(icon) {
        if (this.typeOfMember === 'New Attender') {
          this.setNewAttendersIcon(icon);
        } else if (this.typeOfMember === 'Leader') {
          this.setCellIcon(icon);
        }
        this.loadIconsToSelect();
      },
    },
    props: [
      'typeOfMember',
    ],
  };
</script>

<style>

</style>
