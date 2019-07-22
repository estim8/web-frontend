/* eslint-disable no-shadow */
import _ from "lodash";

export const START_GAME = "START_GAME";
export const GET_GAME = "GET_GAME";

export const PLAYER_ADDED_TO_GAME = "PLAYER_ADDED_TO_GAME";
export const PLAYER_REMOVED_FROM_GAME = "PLAYER_REMOVED_FROM_GAME";

export const SET_ACTIVE_GAME = "SET_ACTIVE_GAME";

export const state = {
  currentGame: {
    session: {
      id: "",
      cardsetId: "",
      secret: "",
      gameState: ""
    },
    players: []
  }
};

export const getters = {
  activeGameId: state => state.currentGame.session.id
};

export const mutations = {
  [SET_ACTIVE_GAME](state, game) {
    state.currentGame.session.id = game.id;
    state.currentGame.session.cardsetId = game.cardsetId;
    state.currentGame.session.secret = game.secret;
    state.currentGame.session.gameState = game.gameState;
  },
  [PLAYER_ADDED_TO_GAME](state, { gameId, playerId }) {
    state.currentGame.players = [...state.currentGame.players, { playerId }];
  },
  [PLAYER_REMOVED_FROM_GAME](state, { gameId, playerId }) {
    _.remove(state.currentGame.players, player => player.playerId === playerId);
    state.currentGame.players = [...state.currentGame.players];
  }
};

export const actions = {
  [PLAYER_ADDED_TO_GAME]({ commit, getters }, { gameId, playerId }) {
    if (getters.activeGameId === gameId) commit(PLAYER_ADDED_TO_GAME, { gameId, playerId });
  },
  [PLAYER_REMOVED_FROM_GAME]({ commit, getters }, { gameId, playerId }) {
    if (getters.activeGameId === gameId) commit(PLAYER_REMOVED_FROM_GAME, { gameId, playerId });
  },
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
