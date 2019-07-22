/* eslint-disable no-shadow */
export const SET_APP_ERROR = "SET_APP_ERROR";

export const state = {
  error: {
    code: 0,
    message: ""
  },
  currentPage: {
    title: ""
  }
};

export const mutations = {
  [SET_APP_ERROR](state, { errorCode, message }) {
    state.error.code = errorCode;
    state.error.message = message;
  }
};

export const actions = {};
