<template>
  <nav class="navbar">
    <div class=navbar-left>
      <div class="navbar-logo left-element">
        <router-link to="/">
          <img :src="logo" width="100%">
        </router-link>
      </div>
      <div v-if="authenticated" class="nav-links left-element">
        <router-link to="/BugReports">Bug Reports</router-link> | 
        <router-link to="/Applications">Applications</router-link>
      </div>
    </div>
    <div class="navbar-right">
    <template v-if="authenticated">
        <div>Welcome, {{ user.fname }}!</div>
        <Weather />
        <div><a href="#" @click.prevent="logout()">Logout</a></div>
    </template>
    <template v-else>
      <div>
        <router-link to="/Login">Login</router-link> | 
        <router-link to="/Register">Register</router-link>
      </div>
    </template>
    </div>
  </nav>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Weather from "./Weather.vue";
import logo from "../assets/images/bugtrackerlogo.png";

export default {
  name: 'Navbar',
  data: () => ({
    logo: logo
  }),
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      token: 'auth/token'
    })
  },
  methods: {
    ...mapActions({
      signOut: 'auth/signOut',
      purgeApps: 'apps/attemptAlterApps',
      purgeUsers: 'users/attemptAlterUsers',
      purgeBugs: 'bugs/attemptAlterBugs'
    }),
    logout() {
      this.purgeApps(null);
      this.purgeBugs(null);
      this.purgeUsers(null);
      this.signOut()
      .then(() => {
        this.$router.replace({
          name: 'Home'
        })
      })
    }
  },
  components: {
    Weather: Weather
  }
}
</script>
<style scoped>
  a {
    color: #ffffff;
    text-decoration: none;
  }

  .router-link-active {
    color: #ffffff;
    text-decoration: none;
  }

  .navbar {
    position: relative;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 15px;
    padding-left: 15px;
    padding-top: 5px;
    background-color:#166abd;
    color: #ffffff;
    box-shadow: 2px 2px 10px #888888;
  }

  .navbar-right, .navbar-left {
    display:flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
  }
  
  .navbar-logo {
    width: 25%;
    max-width: 300px;
    min-width: 200px;
    display: inline-block;
  }

  .left-element {
    padding-right: 20px;
  }

</style>