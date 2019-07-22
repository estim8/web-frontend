/* eslint-disable no-param-reassign */
import axios from "axios";
import state from "vuex";

const axiosInstance = axios.create({
  baseURL: "https://api-qa.estim8.io/api/v1"
});

axiosInstance.defaults.headers.common.Authorization = state.currentUser
  ? state.currentUser.token
  : "";

const BackendApi = {
  install(Vue, options) {
    Vue.prototype.$api = axiosInstance;
    if (options && options.store) options.store.$api = axiosInstance;
  }
};

export default BackendApi;
