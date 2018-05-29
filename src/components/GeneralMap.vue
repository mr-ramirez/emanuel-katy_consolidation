<template>
  <div>
    <div class="row">
      <Locator />
      <div class="col-12" v-if="loading">
        <Spinner />
      </div>
      <div class="col-sm-8 pr-0" v-if="!loading">
        <GmapMap
          :center="center"
          :zoom="zoom"
          style="width: 100%; height: 500px"
          ref="mapRef"
        >
          <GmapMarker
            :position="churchLocation"
            :clickable="true"
            :draggable="false"
            @click="resetSelectedMember()"
            :icon="chapelIconPath"
          />
          <GmapMarker
            v-if="!shouldNewAttenderBeHidden"
            v-for="(attender, indexAttender) in newAttenders"
            :key="indexAttender + 'A'"
            :position="getNewAttenderPosition(indexAttender)"
            :clickable="true"
            :draggable="false"
            @click="displayDetails(attender)"
            :icon="getNewAttenderIcon(indexAttender)"
          />
          <GmapMarker
            v-if="!shouldCellBeHidden"
            v-for="(cell, indexCell) in cellsAddresses"
            :key="indexCell + 'C'"
            :position="getCellPosition(indexCell)"
            :clickable="true"
            :draggable="false"
            @click="displayDetails(cell)"
            :icon="getCellIcon(indexCell)"
          />
        </GmapMap>
      </div>

      <div class="col-sm-4 pl-0" v-if="!loading">
        <div class="accordion" id="accordion">
          <div class="card rounded-0 border border-dark">
            <div class="card-header rounded-0 bg-secondary" id="nuevosMiembrosHeader">
              <h5 class="mb-0">
                <button class="btn btn-link text-light"
                  type="button"
                  data-toggle="collapse"
                  data-target="#nuevosMiembrosLista"
                  aria-expanded="true"
                  aria-controls="nuevosMiembrosLista">
                  Nuevos Miembros
                </button>
              </h5>
            </div>

            <div id="nuevosMiembrosLista"
              class="collapse show"
              aria-labelledby="nuevosMiembrosHeader"
              data-parent="#accordion">
              <div class="card-body p-0">
                <div class="list-group list-group-flush">
                  <a :class="{
                      'list-group-item': true,
                      'list-group-item-action': true,
                      'text-danger': isPositionUndefined(attender),
                      'disabled': isPositionUndefined(attender),
                    }"
                    v-for="(attender, indexAttender) in newAttenders"
                    :key="indexAttender + 'AI'"
                    v-on:click="centerMember(attender)">
                    {{ `${attender.firstName} ${attender.lastName}` }}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="card rounded-0 border border-dark">
            <div class="card-header rounded-0 bg-header-collapsible" id="lideresCelulaHeader">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed text-light"
                  type="button" data-toggle="collapse"
                  data-target="#lideresCelulaLista"
                  aria-expanded="false"
                  aria-controls="lideresCelulaLista">
                  Líderes de Célula
                </button>
              </h5>
            </div>
            <div id="lideresCelulaLista" class="collapse" aria-labelledby="lideresCelulaHeader" data-parent="#accordion">
              <div class="card-body p-0">
                <div class="list-group list-group-flush">
                  <a :class="{
                      'list-group-item': true,
                      'list-group-item-action': true,
                      'text-danger': isPositionUndefined(cell),
                      'disabled': isPositionUndefined(cell),
                    }"
                    v-for="(cell, indexCell) in cellsAddresses"
                    :key="indexCell + 'CI'"
                    v-on:click="centerMember(cell)">
                    {{ `${cell.firstName} ${cell.lastName}` }}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="card rounded-0 border border-dark">
            <div class="card-header rounded-0 bg-info" id="miembrosConstantesHeader">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed text-light"
                  type="button" data-toggle="collapse"
                  data-target="#miembrosConstantesLista"
                  aria-expanded="false"
                  aria-controls="miembrosConstantesLista">
                  Miembros Constantes
                </button>
              </h5>
            </div>
            <div id="miembrosConstantesLista" class="collapse" aria-labelledby="miembrosConstantesHeader" data-parent="#accordion">
              <div class="card-body">
                <p>Lista vacía</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-sm-2"></div>

      <div class="col-sm-8">
        <div class="card text-center border border-info">
          <div class="card-header">
            Indicadores
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-sm-6">
                <div class="row">
                  <div class="col-8">
                    <div class="row">
                      <div class="col-12 d-flex justify-content-start">
                        <h5 class="m-0">Nuevo Miembro</h5>
                      </div>
                      <div class="col-12 d-flex justify-content-start">
                        <p class="m-0"><strong>Status:</strong> Attender</p>
                      </div>
                      <div class="col-12 d-flex justify-content-start">
                        <p class="m-0"><strong>Tag:</strong> Nuevo Convertido</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="row justify-content-center">
                      <img :src="newAttenderIconPath"/>
                    </div>
                    <div class="row justify-content-center">
                      <button type="button"
                        class="btn btn-light p-1">Cambiar Color</button>
                    </div>
                    <div class="row justify-content-center">
                      <button type="button"
                        class="btn btn-light p-1"
                        v-on:click="hideNewAttenders()"
                        v-if="!shouldNewAttenderBeHidden">Esconder</button>

                      <button type="button"
                        class="btn btn-success p-1"
                        v-on:click="showNewAttenders()"
                        v-if="shouldNewAttenderBeHidden">Mostrar</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="row">
                  <div class="col-8">
                    <div class="row">
                      <div class="col-12 d-flex justify-content-start">
                        <h5 class="m-0">Líder de Célula</h5>
                      </div>
                      <div class="col-12 d-flex justify-content-start">
                        <p class="m-0"><strong>Status:</strong> Member</p>
                      </div>
                      <div class="col-12 d-flex justify-content-start">
                        <p class="m-0"><strong>Tag:</strong> Lider de Celula</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="row justify-content-center">
                      <img :src="cellIconPath"/>
                    </div>
                    <div class="row justify-content-center">
                      <button type="button" class="btn btn-light p-1">Cambiar Color</button>
                    </div>
                    <div class="row justify-content-center">
                      <button type="button"
                        class="btn btn-light p-1"
                        v-on:click="hideCells()"
                        v-if="!shouldCellBeHidden">Esconder</button>

                      <button type="button"
                        class="btn btn-success p-1"
                        v-on:click="showCells()"
                        v-if="shouldCellBeHidden">Mostrar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-2"></div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex';
  import {
    SHOW_DETAILS,
    SHOW_MAP_OPTIONS,
  } from '../store/mutation-types';

  import Config from '../config/config';

  import Locator from './Locator.vue';
  import Spinner from './Spinner.vue';

  import Chapel from '../assets/img/icons/chapel.png';
  import MarkerSelected from '../assets/img/icons/marker-selected.png';

  export default {
    name: 'GeneralMap',
    beforeMount() {
      this.initialize();
    },
    components: {
      Locator,
      Spinner,
    },
    computed: {
      ...mapState('app', [
        'cellIconPath',
        'newAttenderIconPath',
      ]),
      ...mapState('members', [
        'cellsAddresses',
        'newAttenders',
      ]),
    },
    data() {
      return {
        center: { lat: 29.7878773, lng: -95.69286590000002 },
        chapelIconPath: Chapel,
        churchLocation: Config.churchLocation,
        loading: false,
        memberSelected: null,
        shouldCellBeHidden: false,
        shouldNewAttenderBeHidden: false,
        zoom: 13,
      };
    },
    methods: {
      ...mapActions('members', [
        'getCellsAddresses',
        'getNewAttenders',
      ]),
      ...mapMutations('members', {
        showDetails: SHOW_DETAILS,
        showMapOptions: SHOW_MAP_OPTIONS,
      }),
      centerMember(member) {
        if (member.position) {
          this.center = member.position;
          this.memberSelected = member;
        }
      },
      displayDetails(person) {
        this.showDetails(person);
        $('#memberInformation').modal('show');
      },
      getCellIcon(index) {
        if (!this.cellsAddresses[index] || !this.cellsAddresses[index].position) {
          return this.cellIconPath;
        }

        if (this.memberSelected !== null
          && this.memberSelected.address === this.cellsAddresses[index].address) {
          return MarkerSelected;
        }
        return this.cellIconPath;
      },
      getCellPosition(index) {
        return this.cellsAddresses[index].position;
      },
      getNewAttenderIcon(index) {
        if (!this.newAttenders[index] || !this.newAttenders[index].position) {
          return this.newAttenderIconPath;
        }

        if (this.memberSelected !== null
          && this.memberSelected.address === this.newAttenders[index].address) {
          return MarkerSelected;
        }
        return this.newAttenderIconPath;
      },
      getNewAttenderPosition(index) {
        return this.newAttenders[index].position;
      },
      hideCells() {
        this.shouldCellBeHidden = true;
      },
      hideNewAttenders() {
        this.shouldNewAttenderBeHidden = true;
      },
      initialize() {
        this.loading = true;
        this.getNewAttenders()
          .then(() => this.getCellsAddresses())
          .then(() => {
            setTimeout(
              () => {
                this.center = Config.churchLocation;
                this.loading = false;
              },
              100,
            );
          });
      },
      isPositionUndefined(member) {
        if (member === undefined || member.position === undefined) {
          return true;
        }
        return false;
      },
      resetSelectedMember() {
        this.center = Config.churchLocation;
        this.memberSelected = null;
      },
      showCells() {
        this.shouldCellBeHidden = false;
      },
      showNewAttenders() {
        this.shouldNewAttenderBeHidden = false;
      },
    },
  };
</script>

<style scoped>
 .bg-header-collapsible {
   background-color: rgba(22,98,117,1);
 }
</style>
