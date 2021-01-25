<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="signup">
      <div class="text-red" v-if="error">{{ error }}</div>
      <br v-else />
      <input type="text" v-model="regForm.fname" class="input" id="fname" placeholder="First Name" required><br>
      <input type="text" v-model="regForm.lname" class="input" id="lname" placeholder="Last Name" required><br>
      <input type="email" v-model="regForm.email" class="input" id="email" placeholder="Email" required><br>
      <input type="text" v-model="regForm.zipCode" class="input" id="zipCode" placeholder="Zip Code" required><br>
      <input type="password" v-model="regForm.password" class="input" id="password" placeholder="Password"><br>
      <input type="password" v-model="regForm.password_confirmation" class="input" id="password_confirmation" placeholder="Confirm Password"><br>
      <button type="submit" class="button">Sign Up</button>
    </form>
    <p>Already registered? <router-link to="/login">Click here to login.</router-link></p>
    <div class="screen-fill-message fade-in" v-if="pending">
      <div class="pending-screen">
        <h1>Registering</h1>
        <h2>May take a moment</h2>
      </div>
    </div>
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
      pending,
      error: ""
    }
  },
  methods: {
    ...mapActions({
      register: 'auth/register',
      retrieveApps: 'apps/retrieveApps',
      retrieveBugs: 'bugs/retrieveBugs',
      retrieveUsers: 'users/retrieveUsers'
    }),
    signup: function() {
      // Validation
      if (this.regForm.password != this.regForm.password_confirmation) {
        this.error = "Password and password confirmation do not match"
        return;
      }
      this.pending = true;
      this.register(this.regForm)
      .then(response => this.signupSuccessful(response))
      .catch(error => this.signupFailed(error))
    },
    signupSuccessful(response) {
      this.pending = false;
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
    signupFailed(response) {
      this.pending = false;
      this.error = response.data.error;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
}
</script>

<style scoped>
.text-red {
  color: #ff0000;
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