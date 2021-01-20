<template>
  <div id="modal-container">
    <button class="button" :class="buttonClass" @click="fillEditForm">
      {{buttonText}}
    </button>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal" v-if="showModal">
      <h2>{{headerText}}</h2>
        <div class="form">
          <input type="text" v-model="appForm.name" placeholder="App Name"><br>
          <input type="text" v-model="appForm.url" placeholder="App URL"><br>
          <input type="text" v-model="appForm.repo" placeholder="App Repository"><br>
          <select v-model="appForm.status">
            <option disabled value="">Select an App Status</option>
            <option>In Production</option>
            <option>Live/Active</option>
            <option>Discontinued/Inactive</option>
          </select><br>
        </div>
          <button class="button" v-if="!isNewApp" @click.prevent="submitNewApp">{{buttonText}}</button>
          <button class="button" v-else @click.prevent="editApp">{{buttonText}}</button>
          <button class="button" @click="showModal = false">Cancel</button><br>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'Modal',
  data() {
    return {
      showModal: false,
      appForm: {
        name: "",
        url: "",
        repo: "",
        status: ""
      }
    }
  },
  methods: {
    ...mapActions({
      createApp: 'apps/createApp',
      updateApp: 'apps/updateApp'
    }),
    submitNewApp() {
      this.createApp(this.appForm)
      .then(response => {
        this.showModal = false;
      }).catch(() => {
        console.log('error');
      })
    },
    editApp() {
      this.updateApp({ appForm: this.appForm, id: this.app.id })
      .then(response => {
        this.showModal = false;
      }).catch(() => {
        console.log('error')
      })
    },
    fillEditForm() {
      if (this.headerText === "Edit App Info") {
        this.appForm.name = this.app.name;
        this.appForm.url = this.app.url;
        this.appForm.repo = this.app.repo;
        this.appForm.status = this.app.status;
        this.newApp = false;    // Toggles the type of click event for submission
      }
      this.showModal = true;
    }
  },
  computed: {
    isNewApp() {
      return this.headerText === "Edit App Info";
    }
  },
  props: ['headerText', 'app', 'buttonText', 'buttonClass']
}
</script>
<style scoped>


</style>