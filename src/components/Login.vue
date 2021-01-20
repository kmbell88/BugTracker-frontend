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
      this.signin(this.form)
      .then(response => {
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
  color: red;
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
</style>