/* eslint-disable no-shadow */
import _ from "lodash";
import Vue from "vue";

// Actions
export const CREATE_GAME = "CREATE_GAME";
export const JOIN_GAME = "JOIN_GAME";
export const END_GAME = "END_GAME";
export const START_GAME = "START_GAME";
export const GET_GAME = "GET_GAME";
export const END_SESSION = "END_SESSION";
export const CONNECT_WEBSOCKET = "CONNECT_WEBSOCKET";

// Mutations
export const SET_ACTIVE_GAME = "SET_ACTIVE_GAME";
export const SET_GAME_SESSION = "SET_GAME_SESSION";
export const SET_GAME_SECRET = "SET_GAME_SECRET";
export const SET_WEBSOCKET_CONNECTION = "SET_WEBSOCKET_CONNECTION";
export const SET_GAME_STATE = "SET_GAME_STATE";
export const RESET_APP = "RESET_APP";

export const PLAYER_ADDED_TO_GAME = "PLAYER_ADDED_TO_GAME";
export const PLAYER_REMOVED_FROM_GAME = "PLAYER_REMOVED_FROM_GAME";

function initialState() {
  return {
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
}

export const state = initialState();

export const getters = {
  activeGame: state => state.currentGame,
  activeGameId: state => state.currentGame.gameId,
  activeSession: state => state.currentGame.session,
  isDealer: state =>
    state.currentGame.gameId !== "" &&
    state.currentGame.session.playerId === state.currentGame.dealerId
};

export const mutations = {
  [SET_ACTIVE_GAME](state, { game, players }) {
    state.currentGame.gameId = game.id;
    state.currentGame.state = game.state;
    state.currentGame.dealerId = game.dealerId;

    players.forEach(p => {
      if (!_.find(state.currentGame.players, player => player.playerId === p.id))
        state.currentGame.players = [
          ...state.currentGame.players,
          { playerId: p.id, playerName: p.name, gravatar: p.email }
        ];
    });
  },
  [SET_GAME_SESSION](state, { accessToken, playerId }) {
    state.currentGame.session.accessToken = accessToken;
    state.currentGame.session.playerId = playerId;
  },
  [SET_WEBSOCKET_CONNECTION](state, { connected }) {
    state.currentGame.session.websocketConnected = connected;
  },
  [SET_GAME_STATE](state, { gameState }) {
    state.currentGame.state = gameState;
  },
  [SET_GAME_SECRET](state, { secret }) {
    state.currentGame.secret = secret;
  },
  [PLAYER_ADDED_TO_GAME](state, { gameId, playerId, playerName, gravatar }) {
    if (!_.find(state.currentGame.players, player => player.playerId === playerId))
      state.currentGame.players = [
        ...state.currentGame.players,
        { playerId, playerName, gravatar }
      ];
  },
  [PLAYER_REMOVED_FROM_GAME](state, { gameId, playerId }) {
    _.remove(state.currentGame.players, player => player.playerId === playerId);
    state.currentGame.players = [...state.currentGame.players];
  },
  [RESET_APP](state) {
    Object.assign(state, initialState());
  }
};

export const actions = {
  async [CREATE_GAME]({ commit, dispatch }, { secret, playerName, gravatar }) {
    try {
      const { data, headers } = await this.$api.post("games", {
        secret,
        playerName,
        gravatar
      });
      commit(SET_GAME_SESSION, {
        playerId: data.playerId,
        accessToken: data.token.access_Token
      });
      commit(SET_GAME_SECRET, { secret: secret });
      commit(PLAYER_ADDED_TO_GAME, {
        gameId: data.id,
        playerId: data.playerId,
        playerName,
        gravatar
      });

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

  async [JOIN_GAME]({ commit, dispatch }, { gameId, secret, playerName, gravatar }) {
    try {
      const { data } = await this.$api.post(`games/${gameId}/players`, {
        secret,
        playerName,
        gravatar
      });

      commit(SET_GAME_SESSION, {
        playerId: data.playerId,
        accessToken: data.token.access_Token
      });
      commit(PLAYER_ADDED_TO_GAME, { gameId, playerId: data.playerId, playerName, gravatar });

      await dispatch(CONNECT_WEBSOCKET);

      await dispatch(GET_GAME, { location: `games/${gameId}` });
    } catch (e) {
      console.log({ e });
      commit(
        "app/SET_APP_ERROR",
        { errorCode: e.response.status, message: e.response.statusText },
        { root: true }
      );
    }
  },

  async [END_GAME]({ commit, getters }) {
    try {
      await this.$api.post(`games/${getters.activeGameId}/end`);
      commit(SET_GAME_STATE, { gameState: "Ended" });
    } catch (e) {
      commit(
        "app/SET_APP_ERROR",
        { errorCode: e.response.status, message: e.response.statusText },
        { root: true }
      );
    }
  },

  async [START_GAME]({ commit, getters }) {
    try {
      await this.$api.post(`games/${getters.activeGameId}/start`);
      commit(SET_GAME_STATE, { gameState: "Playing" });
    } catch (e) {
      commit(
        "app/SET_APP_ERROR",
        { errorCode: e.response.status, message: e.response.statusText },
        { root: true }
      );
    }
  },

  async [END_SESSION]({ commit, state }) {
    try {
      if (getters.isDealer(state)) {
        await this.$api.post(`games/${getters.activeGameId(state)}/end`);
      } else {
        await this.$api.delete(
          `games/${getters.activeGameId(state)}/players/${getters.activeSession(state).playerId}`
        );
      }
      await this.$signalr.stop();
      commit(RESET_APP);
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
    this.$signalr.on("PlayerAddedToGame", ({ gameId, playerId, playerName, gravatar }) => {
      commit(PLAYER_ADDED_TO_GAME, { gameId, playerId, playerName, gravatar });
    });

    this.$signalr.on("PlayerRemovedFromGame", ({ gameId, playerId }) => {
      commit(PLAYER_REMOVED_FROM_GAME, { gameId, playerId });
    });

    this.$signalr.on("GameEnded", ({ gameId }) => {
      commit(SET_GAME_STATE, { gameState: "Ended" });
    });

    this.$signalr.on("GameStarted", ({ gameId }) => {
      commit(SET_GAME_STATE, { gameState: "Playing" });
    });

    await startSignalR(this.$signalr, commit);
  },
  async [GET_GAME]({ commit }, { location }) {
    try {
      const { data } = await this.$api.get(location);

      commit(SET_ACTIVE_GAME, {
        game: {
          id: data.id,
          state: data.state,
          dealerId: data.dealerId
        },
        players: data.players
      });
    } catch (e) {
      console.log({ e });
      commit(
        "app/SET_APP_ERROR",
        { errorCode: e.response.status, message: e.response.statusText },
        { root: true }
      );
    }
  }
};

async function startSignalR(signalr, commit) {
  await signalr
    .start()
    .then(() => {
      commit(SET_WEBSOCKET_CONNECTION, { connected: true });
    })
    .catch(err => {
      commit(SET_WEBSOCKET_CONNECTION, { connected: false });
      setTimeout(async () => await startSignalR(signalr, commit), 5000);
    });
}
