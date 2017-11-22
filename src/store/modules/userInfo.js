import { asmx } from "@/utils";
/**
 * Initial state
 * @type {Object}
 */
const state = {
  account: "",
  password: ""
};

/**
 * Getters
 * @type {Object}
 */
const getters = {};

/**
 * Mutations
 * @type {Object}
 */
const mutations = {
  setUserInfo(state, info) {
    state.account = info.account;
    state.password = info.password;
  }
};

/**
 * Actions
 * @type {Object}
 */
const actions = {};

// Export module
export default {
  state,
  getters,
  mutations,
  actions
};
