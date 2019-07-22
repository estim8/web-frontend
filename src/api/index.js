/* eslint-disable no-param-reassign */
import axios from "axios";
import state from "vuex";
import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";

const baseURL = "https://api-qa.estim8.io";
const axiosInstance = axios.create({
  baseURL: `${baseURL}/api/v1`
});

axiosInstance.defaults.headers.common.Authorization = state.currentUser
  ? state.currentUser.token
  : "";

const BackendApi = {
  install(Vue, options) {
    Vue.prototype.$api = axiosInstance;
    if (options && options.store) options.store.$api = axiosInstance;

    const connection = new HubConnectionBuilder()
      .withUrl(`${baseURL}/hubs/games`)
      .configureLogging(LogLevel.Debug)
      .build();

    connection.start().then(() => {
      console.log("SignalR connected");
    });

    // eslint-disable-next-line prettier/prettier
    connection.on("PlayerAddedToGame", ({ gameId, playerId }) => {
      options.store.dispatch("games/PLAYER_ADDED_TO_GAME", { gameId, playerId }, { root: true });
    });

    connection.on("PlayerRemovedFromGame", ({ gameId, playerId }) => {
      options.store.dispatch(
        "games/PLAYER_REMOVED_FROM_GAME",
        { gameId, playerId },
        { root: true }
      );
    });
  }
};

export default BackendApi;
