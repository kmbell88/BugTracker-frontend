// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store'
import './assets/css/main.css';
require('@/store/subscriber');

Vue.config.productionTip = false

if (localStorage.token != undefined) {
  const user = localStorage.getItem('user');
  store.dispatch('auth/attempt', { token: localStorage.token, user: JSON.parse(user) });
  store.dispatch('apps/retrieveApps');
  store.dispatch('bugs/retrieveBugs');
  store.dispatch('users/retrieveUsers');
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App />'
})