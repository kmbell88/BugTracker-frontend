import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Applications from '@/components/Applications.vue';
import BugReports from '@/components/BugReports.vue'
import BugReport from '@/components/BugReport.vue';
import store from '@/store/store';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'BugReportApp',
      path: '/BugReports/:appName/:appId',
      component: BugReports,
      beforeEnter: (to, from, next) => {
        if(!store.getters['auth/authenticated']) {
          return next({
            name: 'Login'
          });
        }

        next();
      }
    },
    {
      name: 'BugReport',
      path:'/BugReports/:appName/Bug/:bugId',
      component: BugReport,
      beforeEnter: (to, from, next) => {
        if(!store.getters['auth/authenticated']) {
          return next({
            name: 'Login'
          });
        }

        next();
      }
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if(store.getters['auth/authenticated']) {
          return next({
            name: 'Applications'
          });
        }
        next();
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      beforeEnter: (to, from, next) => {
        if(store.getters['auth/authenticated']) {
          return next({
            name: 'Applications'
          });
        }

        next();
      }
    },
    {
      path: '/Applications',
      name: 'Applications',
      component: Applications,
      beforeEnter: (to, from, next) => {
        if(!store.getters['auth/authenticated']) {
          return next({
            name: 'Login'
          });
        }

        next();
      }
    },
    {
      path: '/BugReports',
      name: 'BugReports',
      component: BugReports,
      beforeEnter: (to, from, next) => {
        if(!store.getters['auth/authenticated']) {
          return next({
            name: 'Login'
          });
        }

        next();
      }
    }
  ]
})