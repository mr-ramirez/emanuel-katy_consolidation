<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark bg-blue">
    <a class="navbar-brand" href="#">
      <img src="../assets/img/logos/emanuel.png"
        width="150" height="80"
        class="d-inline-block align-top" alt="">
    </a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
      </ul>
      <span class="navbar-text h4 font-weight-light">
        Ministerio de Consolidación
      </span>
    </div>
  </nav>
</template>

<script>
  export default {
    data() {
      return {
        logoSource: '/assets/img/logos/emanuel.png',
        msg: 'Welcome to Your Vue.js App',
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg-blue {
    background-color: '#086A87' !important;
  }
</style>
