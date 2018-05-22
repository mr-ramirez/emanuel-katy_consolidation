<template>
  <div class="modal fade" id="memberInformation" tabindex="-1"
    role="dialog" aria-labelledby="memberInformationLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Información del Miembro de la Iglesia</h5>
          <button type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <h4>{{ person.firstName + ' ' + person.lastName }}</h4>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <p><strong>Número de Contacto: </strong>{{ person.phoneNumber }}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <p><strong>Correo Electrónico: </strong>{{ person.email }}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button"
            class="btn btn-secondary"
            data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';

  import { HIDE_DETAILS } from '../store/mutation-types';

  export default {
    name: 'locator',
    computed: {
      ...mapState('members', [
        'person',
      ]),
    },
    data() {
      return {
        center: {
          lat: 10,
          lng: 10,
        },
      };
    },
    methods: {
      ...mapMutations('members', {
        hideDetails: HIDE_DETAILS,
      }),
    },
    props: {
      member: Object,
    },
  };
</script>

<style>

</style>
