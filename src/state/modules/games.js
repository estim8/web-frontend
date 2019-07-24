/* eslint-disable no-shadow */
import _ from "lodash";
import Vue from "vue";

export const START_GAME = "START_GAME";
export const GET_GAME = "GET_GAME";
export const CONNECT_WEBSOCKET = "CONNECT_WEBSOCKET";

export const PLAYER_ADDED_TO_GAME = "PLAYER_ADDED_TO_GAME";
export const PLAYER_REMOVED_FROM_GAME = "PLAYER_REMOVED_FROM_GAME";

export const SET_ACTIVE_GAME = "SET_ACTIVE_GAME";
export const SET_GAME_SESSION = "SET_GAME_SESSION";
export const SET_GAME_SECRET = "SET_GAME_SECRET";
export const SET_WEBSOCKET_CONNECTION = "SET_WEBSOCKET_CONNECTION";

export const state = {
  currentGame: {
    session: {
      playerId: "",
      accessToken: "",
      websocketConnected: false
    },
    secret: "",
    gameId: "",
    cardsetId: "",
    state: "",
    dealerId: "",
    players: []
  }
};

export const getters = {
  activeGame: state => state.currentGame,
  activeGameId: state => state.currentGame.gameId,
  activeSession: state => state.currentGame.session,
  isDealer: state => state.currentGame.session.playerId === state.currentGame.dealerId
};

export const mutations = {
  [SET_ACTIVE_GAME](state, game) {
    state.currentGame.gameId = game.id;
    state.currentGame.cardsetId = game.cardsetId;
    state.currentGame.secret = game.secret;
    state.currentGame.state = game.state;
    state.currentGame.dealerId = game.dealerId;
  },
  [SET_GAME_SESSION](state, { accessToken, playerId }) {
    state.currentGame.session.accessToken = accessToken;
    state.currentGame.session.playerId = playerId;
  },
  [SET_WEBSOCKET_CONNECTION](state, { connected }) {
    state.currentGame.session.websocketConnected = connected;
  },
  [SET_GAME_SECRET](state, { secret }) {
    state.currentGame.secret = secret;
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
  async [START_GAME]({ commit, dispatch }, { cardsetId, secret }) {
    try {
      const { data, headers } = await this.$api.post("games", {
        cardsetId,
        secret
      });
      commit(SET_GAME_SESSION, {
        playerId: data.playerId,
        accessToken: data.token.access_Token
      });
      commit(SET_GAME_SECRET, { secret: data.secret });

      await dispatch(CONNECT_WEBSOCKET);

      await dispatch(GET_GAME, {
        location: headers.location
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
  async [CONNECT_WEBSOCKET]({ commit, dispatch }) {
    this.$signalr.on("PlayerAddedToGame", ({ gameId, playerId }) => {
      commit(PLAYER_ADDED_TO_GAME, { gameId, playerId });
    });

    this.$signalr.on("PlayerRemovedFromGame", ({ gameId, playerId }) => {
      commit(PLAYER_REMOVED_FROM_GAME, { gameId, playerId });
    });

    await this.$signalr
      .start()
      .then(() => {
        commit(SET_WEBSOCKET_CONNECTION, { connected: true });
      })
      .catch(err => {
        commit(SET_WEBSOCKET_CONNECTION, { connected: false });
        setTimeout(async () => await dispatch(CONNECT_WEBSOCKET), 5000);
      });
  },
  async [GET_GAME]({ commit }, { location }) {
    try {
      const { data } = await this.$api.get(location);

      commit(SET_ACTIVE_GAME, {
        id: data.id,
        cardsetId: data.cardsetId,
        secret: data.secret,
        state: data.state,
        dealerId: data.dealerId
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
