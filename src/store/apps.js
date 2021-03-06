import axios from 'axios';

export default ({
  namespaced: true,
  state: {
    apps: null
  },
  getters: {
    getApps(state) {
      if (state.apps != null) {
        return state.apps.sort((a, b) => {
          if (a.name > b.name)
            return 1;
          if (a.name < b.name)
            return -1;
          return 0;
        })
      };
    }
  },
  mutations: {
    // if statement for purging apps after logout
    // else if statement for initializing the apps array.
    // else statement for adding or updating apps.
    SET_APPS(state, data) {
      if (data == null)
        state.apps = null;
      else if (state.apps == null)
        state.apps = data;
      else {
        state.apps = state.apps.filter(app => data.id !== app.id);
        state.apps.push(data);
      }
    }
  },
  actions: {
    async createApp({ dispatch }, credentials) {
      let addr = process.env.VUE_APP_PROD_URL || 'http://localhost:3000';
      let response = await axios.post(`${addr}/apps`, credentials);
      dispatch('attemptAlterApps', response.data);
      return response;
    },
    async updateApp({ dispatch }, credentials) {
      let addr = process.env.VUE_APP_PROD_URL || 'http://localhost:3000';
      let response = await axios.patch(`${addr}/apps/${credentials.id}`, credentials.appForm);
      dispatch('attemptAlterApps', response.data);
      return response;
    },
    async attemptAlterApps({ commit }, data) {
      commit('SET_APPS', data);
    },
    async retrieveApps({ dispatch }) {
      let addr = process.env.VUE_APP_PROD_URL || 'http://localhost:3000';
      let response = await axios.get(`${addr}/apps`);
      dispatch('attemptAlterApps', response.data);
      return response;
    }
  }
})