import Vue from 'vue';
import Router from 'vue-router';
import Header from '../components/Header.vue';
import Main from '../components/Main.vue';
import Footer from '../components/Footer.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      components: {
        header: Header,
        main: Main,
        footer: Footer,
      },
    },
  ],
});