<template>
  <div class="modal fade" id="memberInformation" tabindex="-1"
    role="dialog" aria-labelledby="memberInformationLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header bg-success">
          <p class="modal-title text-light" id="exampleModalLabel">Información del Miembro de la Iglesia</p>
          <button type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close">
            <span class="text-white" aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <h4 class="text-center">{{ getName() }}</h4>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <table class="table table-striped m-0">
                <tbody>
                  <tr>
                    <td>Phone Number</td>
                    <td>{{ getPhoneNumber() }}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{{ getEmail() }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
      getEmail() {
        if (this.person !== null) {
          return this.person.email;
        }
        return '';
      },
      getName() {
        if (this.person !== null) {
          return `${this.person.firstName} ${this.person.lastName}`;
        }
        return '';
      },
      getPhoneNumber() {
        if (this.person !== null) {
          return this.person.phoneNumber;
        }
        return '';
      },
    },
  };
</script>

<style>

</style>
