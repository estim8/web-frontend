import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const START_GAME = "START_GAME";
export const GET_GAME = "GET_GAME";

export const SET_ACTIVE_GAME = "SET_ACTIVE_GAME";
export const SET_APP_ERROR = "SET_APP_ERROR";

export default new Vuex.Store({
  state: {
    currentGame: {
      session: {
        id: "",
        cardsetId: "",
        secret: "",
        gameState: ""
      }
    },
    error: {
      code: 0,
      message: ""
    },
    currentPage: {
      title: ""
    }
  },
  mutations: {
    [SET_ACTIVE_GAME](state, { id, cardsetId, secret }) {
      state.currentGame.session.id = id;
      state.currentGame.session.cardsetId = cardsetId;
      state.currentGame.session.secret = secret;
    },
    [SET_APP_ERROR](state, { errorCode, message }) {
      state.error.code = errorCode;
      state.error.message = message;
    }
  },
  actions: {
    async [START_GAME]({ commit, dispatch }, { cardsetId, secret }) {
      try {
        const response = await axios.post("https://api-qa.estim8.io/api/v1/games", {
          cardsetId,
          secret
        });
        await dispatch(GET_GAME, response.headers.location);
      } catch (e) {
        commit(SET_APP_ERROR, { errorCode: e.code, message: "Server failed" });
      }
    },
    async [GET_GAME]({ commit }, uri) {
      try {
        const response = await axios.get(uri);
        commit(SET_ACTIVE_GAME, {
          id: response.data.id,
          cardsetId: response.data.cardsetId,
          secret: response.data.secret,
          gameState: response.data.state
        });
      } catch (e) {
        commit(SET_APP_ERROR, { errorCode: e.code, message: "Server failed" });
      }
    }
  }
});
