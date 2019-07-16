
import { uniAngleDoubleRight } from "vue-unicons/src/icons";
import './assets/scss/estim8.scss';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Unicon from "vue-unicons";
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Unicon.add([uniAngleDoubleRight]);
Vue.use(Unicon);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
