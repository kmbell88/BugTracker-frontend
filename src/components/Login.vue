<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="submit">
      <div class="text-red" v-if="error">{{ error }}</div>
      <div v-else><br></div>
      <input type="email" v-model="form.email" class="input" id="email" placeholder="Email"><br>
      <input type="password" v-model="form.password" class="input" id="password" placeholder="Password"><br>
      <button type="submit" class="button">Login</button>
    </form>
    <p>Not registered? <router-link to="/Register">Click here to register.</router-link></p>
    <div class="screen-fill-message fade-in" v-if="pending">
      <div class="pending-screen">
      <h1>Logging In</h1>
      <h2>May take a moment</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      pending: false,
      error: ""
    }
  },
  methods: {
    ...mapActions({
      signin: 'auth/signin',
      retrieveApps: 'apps/retrieveApps',
      retrieveBugs: 'bugs/retrieveBugs',
      retrieveUsers: 'users/retrieveUsers'
    }),
    submit() {
      this.pending = true;
       this.signin(this.form)
       .then(response => {
         this.pending = false;
         if (!response.data.error) {
           this.retrieveApps();
           this.retrieveBugs();
           this.retrieveUsers();
           this.$router.replace('/BugReports');
         } else {
           this.error = response.data.error;
         }
      })
    }
  }
}
</script>

<style scoped>
.text-red {
  color: #ff0000;
}

.login {
  min-height: 80vh;
  padding: 20px;
}

input {
  padding: 5px;
  margin: 5px;
  width: 90%;
  max-width: 500px;
}

.button {
  appearance: none;
  outline: none;
  border: none;
  background-color: #166abd;
  cursor: pointer;
  display: inline-block;
  padding: 10px 25px;
  border-radius: 8px;
  color: #FFF;
  font-size: 18px;
  font-weight: 700;
  box-shadow: 4px 4px 4px #eeeeee;
  transition: 0.4s ease-out;
  margin: 0;
}

.screen-fill-message {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(0, 0, 0, .5);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  color: #ffffff;
  text-align: center;
  text-shadow: 1px 1px 2px #000000;
}

.fade-in {
animation: fadeIn ease 0.5s;
-webkit-animation: fadeIn ease 0.5s;
-moz-animation: fadeIn ease 0.5s;
-o-animation: fadeIn ease 0.5s;
-ms-animation: fadeIn ease 0.5s;
}
@keyframes fadeIn {
0% {opacity:0;}
100% {opacity:1;}
}

@-moz-keyframes fadeIn {
0% {opacity:0;}
100% {opacity:1;}
}

@-webkit-keyframes fadeIn {
0% {opacity:0;}
100% {opacity:1;}
}

@-o-keyframes fadeIn {
0% {opacity:0;}
100% {opacity:1;}
}

@-ms-keyframes fadeIn {
0% {opacity:0;}
100% {opacity:1;}
}
</style>