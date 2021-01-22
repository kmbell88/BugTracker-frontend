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
      <div class="welcome">Welcome, {{ user.fname }}!</div>
      <Weather />
      <div class="logout"><a href="#" @click.prevent="logout()">Logout</a></div>
      <div class="hamburger-icon" @click="showMenu">
        <div class="icon-bars"></div>
        <div class="icon-bars"></div>
        <div class="icon-bars"></div>
      </div>
      <div id="responsive-menu">
        <ul>
          <li><router-link to="/BugReports">Bug Reports</router-link></li>
          <li><router-link to="/Applications">Applications</router-link></li>
          <li><a href="#" @click.prevent="logout()">Logout</a></li>
        </ul>
      </div>
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
    logo: logo,
    windowWidth: 0
  }),
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    })
  },
  watch: {
    windowWidth(newWindowWidth, oldWindowWidth) {
      if (newWindowWidth > 900)
        document.getElementById('responsive-menu').style.display = 'none';
    }
  },
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
    },
    showMenu() {
      let menu = document.getElementById('responsive-menu');
      menu.style.display == 'none' ? menu.style.display = 'block' : menu.style.display = 'none';
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

  .welcome {
    display: block;
  }

  .hamburger-icon {
    display: none;
  }

  #responsive-menu {
    display: none;
  }

  @media (max-width: 900px) {
    .welcome, .nav-links, .logout {
      display: none;
    }

    .hamburger-icon {
      display: block;
      padding-right: 5px;
      padding-left: 10px;
      cursor: pointer;
    }

    .icon-bars {
      width: 30px;
      height: 4px;
      background-color: #eeeeee;
      margin: 6px 0;
      border-radius: 10px;
    }

    #responsive-menu {
      display: none;
      position: absolute;
      top: 70px;
      right: 0;
      background-color: #166abd;
      border-radius: 0 0 10px 10px;
      width: 150px;
      text-align: center;
    }

    #responsive-menu ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    #responsive-menu ul li {
      padding-left: 15px;
      padding-right: 15px;
      padding-bottom: 10px;
      padding-top: 5px;
    }
  }

</style>