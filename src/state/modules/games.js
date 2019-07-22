/* eslint-disable no-shadow */

export const START_GAME = "START_GAME";
export const GET_GAME = "GET_GAME";

export const SET_ACTIVE_GAME = "SET_ACTIVE_GAME";

export const state = {
  currentGame: {
    session: {
      id: "",
      cardsetId: "",
      secret: "",
      gameState: ""
    }
  }
};

export const getters = {
  activeGameId: state => state.currentGame.session.id
};

export const mutations = {
  [SET_ACTIVE_GAME](state, { id, cardsetId, secret }) {
    state.currentGame.session.id = id;
    state.currentGame.session.cardsetId = cardsetId;
    state.currentGame.session.secret = secret;
  }
};

export const actions = {
  async [START_GAME]({ commit, dispatch }, { cardsetId, secret }) {
    try {
      const response = await this.$api.post("games", {
        cardsetId,
        secret
      });
      await dispatch(GET_GAME, response.headers.location);
    } catch (e) {
      console.log({ e });
      commit(
        "app/SET_APP_ERROR",
        { errorCode: e.response.status, message: e.response.statusText },
        { root: true }
      );
    }
  },
  async [GET_GAME]({ commit }, uri) {
    try {
      const response = await this.$api.get(uri);
      commit(SET_ACTIVE_GAME, {
        id: response.data.id,
        cardsetId: response.data.cardsetId,
        secret: response.data.secret,
        gameState: response.data.state
      });
    } catch (e) {
      commit(
        "app/SET_APP_ERROR",
        { errorCode: e.response.status, message: e.response.statusText },
        { root: true }
      );
    }
  }
};
