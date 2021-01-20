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
      let response = await axios.get('http://localhost:3000/users');
      dispatch('attemptAlterUsers', response.data);
      return response;
    }
  }
})