import { uniAngleDoubleRight, uniCaretRight, uniUserPlus } from "vue-unicons/src/icons";
import "./assets/scss/estim8.scss";

import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import Unicon from "vue-unicons";
import VueQriously from "vue-qriously";

import store from "@/state/store";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import BackendApi from "@/api";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BackendApi, { store });
Vue.use(VueQriously);

Unicon.add([uniAngleDoubleRight, uniCaretRight, uniUserPlus]);
Vue.use(Unicon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
