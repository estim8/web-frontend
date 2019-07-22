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
      dealerToken: "",
      cardsetId: "",
      secret: "",
      gameState: ""
    },
    players: []
  }
};

export const getters = {
  activeGameId: state => state.currentGame.session.id,
  activeSession: state => state.currentGame.session,
  // eslint-disable-next-line prettier/prettier
  isDealer: state => state.currentGame.session.dealerToken !== undefined &&
    state.currentGame.session.dealerToken !== ""
};

export const mutations = {
  [SET_ACTIVE_GAME](state, game) {
    state.currentGame.session.id = game.id;
    state.currentGame.session.cardsetId = game.cardsetId;
    state.currentGame.session.secret = game.secret;
    state.currentGame.session.gameState = game.gameState;
    state.currentGame.session.dealerToken = game.dealerToken;
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
      await dispatch(GET_GAME, {
        location: response.headers.location,
        dealerToken: response.headers["x-dealer-token"]
      });
    } catch (e) {
      console.log({ e });
      commit(
        "app/SET_APP_ERROR",
        { errorCode: e.response.status, message: e.response.statusText },
        { root: true }
      );
    }
  },
  async [GET_GAME]({ commit }, { location, dealerToken }) {
    try {
      const response = await this.$api.get(location);
      commit(SET_ACTIVE_GAME, {
        id: response.data.id,
        cardsetId: response.data.cardsetId,
        secret: response.data.secret,
        gameState: response.data.state,
        dealerToken
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
