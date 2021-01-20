<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="signup">
      <div class="text-red" v-if="error">{{ error }}</div>
      <input type="text" v-model="regForm.fname" class="input" id="fname" placeholder="First Name"><br>
      <input type="text" v-model="regForm.lname" class="input" id="lname" placeholder="Last Name"><br>
      <input type="email" v-model="regForm.email" class="input" id="email" placeholder="Email"><br>
      <input type="text" v-model="regForm.zipCode" class="input" id="zipCode" placeholder="Zip Code"><br>
      <input type="password" v-model="regForm.password" class="input" id="password" placeholder="Password"><br>
      <input type="password" v-model="regForm.password_confirmation" class="input" id="password_confirmation" placeholder="Confirm Password"><br>
      <button type="submit" class="button">Sign Up</button>
    </form>

    <p>Already registered? <router-link to="/login">Click here to login.</router-link></p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      regForm: {
        fname: "",
        lname: "",
        email: "",
        zipCode: "",
        password: "",
        password_confirmation: ""
      },
      error: ""
    }
  },
  methods: {
    ...mapActions({
      register: 'auth/register'
    }),
    signup: function() {
      this.register(this.regForm)
      .then(response => this.signupSuccessful(response))
      .catch(error => this.signupFailed(error))
    },
    signupSuccessful(response) {
      if(!response.data.token) {
        this.signupFailed(response);
        return
      } else {
        this.retrieveApps();
        this.retrieveBugs();
        this.retrieveUsers();
        this.$router.replace('/BugReports');
      }
      this.error = "";
    },
    signupFailed(error) {
      this.error = (error.response && error.response.data && error.response.data.error) || "";
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
}
</script>

<style scoped>
.text-red {
  color: red;
}

.register {
  min-height: 80vh;
  padding: 20px;
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