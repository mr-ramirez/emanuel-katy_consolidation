import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery.easing';
import 'font-awesome/css/font-awesome.css';
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';

import Config from './config/config';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: Config.googleApiKey,
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
