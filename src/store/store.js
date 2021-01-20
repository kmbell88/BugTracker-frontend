import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import apps from './apps';
import bugs from './bugs';
import users from './users';

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    auth,
    apps,
    bugs,
    users
  }
});