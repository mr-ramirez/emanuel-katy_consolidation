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
    methods: {
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg-blue {
    background: rgba(6,124,148,1);
    background: -moz-radial-gradient(center, ellipse cover, rgba(6,124,148,1) 0%, rgba(22,98,117,1) 41%, rgba(9,50,61,1) 100%);
    background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, rgba(6,124,148,1)), color-stop(41%, rgba(22,98,117,1)), color-stop(100%, rgba(9,50,61,1)));
    background: -webkit-radial-gradient(center, ellipse cover, rgba(6,124,148,1) 0%, rgba(22,98,117,1) 41%, rgba(9,50,61,1) 100%);
    background: -o-radial-gradient(center, ellipse cover, rgba(6,124,148,1) 0%, rgba(22,98,117,1) 41%, rgba(9,50,61,1) 100%);
    background: -ms-radial-gradient(center, ellipse cover, rgba(6,124,148,1) 0%, rgba(22,98,117,1) 41%, rgba(9,50,61,1) 100%);
    background: radial-gradient(ellipse at center, rgba(6,124,148,1) 0%, rgba(22,98,117,1) 41%, rgba(9,50,61,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#067c94', endColorstr='#09323d', GradientType=1 );
  }
</style>
