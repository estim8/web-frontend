import { uniAngleDoubleRight } from "vue-unicons/src/icons";
import "./assets/scss/estim8.scss";

import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import Unicon from "vue-unicons";
import store from "@/state/store";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import BackendApi from "@/api";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BackendApi, { store });

Unicon.add([uniAngleDoubleRight]);
Vue.use(Unicon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
