/* eslint-disable no-param-reassign */
import axios from "axios";
import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";

const baseURL = "https://api-qa.estim8.io";
const axiosInstance = axios.create({
  baseURL: `${baseURL}/api/v1`
});

const BackendApi = {
  install(Vue, options) {
    const { store } = options;
    axiosInstance.interceptors.request.use(
      config => {
        if (store.getters["games/activeSession"].accessToken) {
          config.headers.Authorization = `Bearer ${store.getters["games/activeSession"].accessToken}`;
        }
        return config;
      },
      error => {
        Promise.reject(error);
      }
    );

    Vue.prototype.$api = axiosInstance;
    store.$api = axiosInstance;

    store.$signalr = new HubConnectionBuilder()
      .withUrl(`${baseURL}/hubs/games`, {
        accessTokenFactory: () => store.getters["games/activeSession"].accessToken
      })
      .configureLogging(LogLevel.Debug)
      .build();
  }
};

export default BackendApi;
