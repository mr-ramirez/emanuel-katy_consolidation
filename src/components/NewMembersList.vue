<template>
  <div>
    <Spinner v-if="isLoading"></Spinner>
    <div class="row m-3" v-if="!isLoading">
      <div class="col-12 w-100">
        <div class="card border-secondary">
          <h5 class="card-header">Lista de Nuevos Miembros Asignados</h5>
          <div class="card-body">
            <div class="row">
              <div class="col-12 w-100">
                <table class="table table-hover">
                  <thead>
                    <tr class="text-light bg-info">
                      <th scope="col">Primer Nombre</th>
                      <th scope="col">Segundo Nombre</th>
                      <th scope="col">Apellidos</th>
                      <th scope="col">Número de Contacto</th>
                      <th scope="col">Dirección Residencial</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(member, index) in newMembers" :key="index">
                      <td>{{ member.firstName }}</td>
                      <td>{{ member.middleName }}</td>
                      <td>{{ member.lastName }}</td>
                      <td>{{ member.phoneNumber }}</td>
                      <td>{{ member.address }}</td>
                      <td>
                        <button type="button" class="btn btn-info">Células</button>
                        <button type="button" class="btn btn-success">Grupos Familiares</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapActions,
    mapState,
  } from 'vuex';

  import Spinner from './Spinner.vue';

  export default {
    name: 'newMembersList',
    beforeMount() {
      this.isLoading = true;
      this.getNewMembers()
        .then(() => {
          this.isLoading = false;
        });
    },
    components: {
      Spinner,
    },
    computed: {
      ...mapState('members', [
        'newMembers',
      ]),
    },
    data() {
      return {
        isLoading: false,
        persons: [],
      };
    },
    methods: {
      ...mapActions('members', [
        'getNewMembers',
      ]),
    },
  };
</script>

<style>

</style>
