// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery.easing';
import 'font-awesome/css/font-awesome.css';
import * as VueGoogleMaps from 'vue2-google-maps';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAuANDgIy2xXINbsPiRLT8scXYfigQkV90',
    libraries: 'places',
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
