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
          <input type="text" v-model="bugForm.issue" placeholder="Issue"><br>
          <textarea type="text" v-model="bugForm.description" rows="4" placeholder="Description of Bug Issue" /><br>
          <input type="text" v-model="bugForm.location" placeholder="Location of Bug"><br>
          <select v-model="bugForm.app_id">
            <option disabled value="">Select App Where Bug is Located</option>
            <option v-for="app in apps" v-bind:value="app.id">{{app.name}}</option>
          </select><br>
        </div>
          <button class="button" v-if="!isNewBug" @click.prevent="submitNewBug">{{buttonText}}</button>
          <button class="button" v-else @click.prevent="editBug">{{buttonText}}</button>
          <button class="button" @click="showModal = false">Cancel</button><br>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Modal',
  data() {
    return {
      showModal: false,
      bugForm: {
        issue: "",
        description: "",
        location: "",
        status: "",
        app_id: "",
        user_id: ""
      }
    }
  },
  methods: {
    ...mapActions({
      createBug: 'bugs/createBug',
      updateBug: 'bugs/updateBug',
    }),
    submitNewBug() {
      this.bugForm.user_id = this.user.id;
      this.bugForm.status = "Reported";
      this.createBug(this.bugForm)
      .then(response => {
        this.showModal = false;
      }).catch(() => {
        console.log('error');
      })
    },
    editBug() {
      this.updateBug({ bugForm: this.bugForm, id: this.bug.id })
      .then(response => {
        this.showModal = false;
      }).catch(() => {
        console.log('error')
      })
    },
    fillEditForm() {
      if (this.headerText === "Edit Bug Info") {
        this.bugForm.issue = this.bug.issue;
        this.bugForm.description = this.bug.description;
        this.bugForm.location = this.bug.location;
        this.bugForm.status = this.bug.status;
        this.bugForm.app_id = this.bug.app_id;
        this.bugForm.user_id = this.bug.user_id;
        this.newBug = false;    // Toggles the type of click event for submission
      }
      this.showModal = true;
    }
  },
  computed: {
    ...mapGetters({
      apps: 'apps/getApps',
      user: 'auth/user'
    }),
    isNewBug() {
      return this.headerText === "Edit Bug Info";
    }
  },
  props: ['headerText', 'bug', 'buttonText', 'buttonClass']
}
</script>
<style scoped>
/* In @/assets/css/main.css */

</style>