import axios from 'axios';

export default ({
  namespaced: true,
  state: {
    users: null
  },
  getters: {
    getUsers(state) {
      return state.users;
    }
  },
  mutations: {
    SET_USERS(state, data) {
      if (data == null)
        state.users = null;
      else {
        state.users = data;
      }
    }
  },
  actions: {
    async attemptAlterUsers({ commit }, data) {
      commit('SET_USERS', data);
    },
    async retrieveUsers({ dispatch }) {
      let addr = process.env.VUE_APP_PROD_URL
      let response = await axios.get(`${addr}/users`);
      dispatch('attemptAlterUsers', response.data);
      return response;
    }
  }
})