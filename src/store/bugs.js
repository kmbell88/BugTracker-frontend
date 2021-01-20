import axios from 'axios';

export default ({
  namespaced: true,
  state: {
    bugs: null
  },
  getters: {
    getBugs(state) {
      if (state.bugs != null) {
        return state.bugs.sort((a, b) => {
          if (a.created_at < b.created_at)
            return 1;
          if (a.created_at > b.created_at)
            return -1;
          return 0;
        });
      }
    }
  },
  mutations: {
    SET_BUGS(state, data) {
      if (data == null)
        state.bugs = null;
      else if (state.bugs == null || state.bugs.length === 0)
        state.bugs = data;
      else {
        state.bugs = state.bugs.filter(bug => data.id !== bug.id);
        state.bugs.push(data);
      }
    }
  },
  actions: {
    async createBug({ dispatch }, credentials) {
      let response = await axios.post('http://localhost:3000/bugs', credentials);
      dispatch('attemptAlterBugs', response.data);
      return response;
    },
    async updateBug({ dispatch }, credentials) {
      let response = await axios.patch(`http://localhost:3000/bugs/${credentials.id}`, credentials.bugForm);
      dispatch('attemptAlterBugs', response.data);
      return response;
    },
    async attemptAlterBugs({ commit }, data) {
      commit('SET_BUGS', data);
    },
    async retrieveBugs({ dispatch }) {
      let response = await axios.get('http://localhost:3000/bugs');
      dispatch('attemptAlterBugs', response.data);
      return response;
    }
  }
})