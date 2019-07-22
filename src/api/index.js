import axios from "axios";
import state from "vuex";

export const apiUrl = "https://api-qa.estim8.io/api/v1";

export const api = axios.create();

function setDefaultAuthHeaders() {
  axios.defaults.headers.common.Authorization = state.currentUser ? state.currentUser.token : "";
}
