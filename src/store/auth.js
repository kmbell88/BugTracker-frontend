import axios from 'axios';

export default ({
  namespaced: true,
  state: {
    token: null,
    user: null
  },
  getters: {
    authenticated(state) {
      return state.token && state.user;
    },
    user(state) {
      return state.user;
    },
    token(state) {
      return state.token;
    }
  },
  mutations: {
    SET_TOKEN(state, data) {
      if (data != null)
        state.token = data.token;
      else
        state.token = null;
    },
    SET_USER(state, data) {
      if (data != null) {
        state.user = {
          id: data.user.id,
          fname: data.user.fname,
          lname: data.user.lname,
          email: data.user.email,
          zipCode: data.user.zipCode
        };
      }
      else {
        state.user = null;
      }
    }
  },
  actions: {
    async signin({ dispatch }, credentials) {
      let URL = process.env.VUE_APP_PROD_URL;
      let response = await axios.post(`${URL}/login`, credentials);
      if (!response.data.error) {
        dispatch('attempt', response.data);
      }
      return response;
    },
    async attempt({ commit }, data) {
      commit('SET_TOKEN', data);
      commit('SET_USER', data);
    },
    signOut({ commit }) {
      // Very simple logout for now that just removes the token from the client.
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      commit('SET_TOKEN', null);
      commit('SET_USER', null);
    },
    async register({ dispatch }, credentials) {
      let URL = process.env.VUE_APP_PROD_URL;
      let response = await axios.post(`${URL}/users`, credentials);
      if (!response.data.error) {
         dispatch('attempt', response.data)
      }
      return response;
    }
  }
})