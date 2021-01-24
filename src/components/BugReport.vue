<template>
  <div class="report-container">
    <div v-if="bug != null && users != null" class="report-div">
      <h2>{{bug.issue}}</h2>
      <h3>{{bug.description}}</h3>
      <p>Application: {{$route.params.appName}}</p>
      <p>Location: {{bug.location}}</p>
      <p>Status:
              <span v-if="bug.status === 'Resolved'" class="status status-green">Resolved</span>
              <span v-else-if="bug.status === 'In Progress'" class="status status-yellow">In Progress</span>
              <span v-else class="status status-red">Reported</span>
      </p>
      <p>Reported By: {{getName(bug.user_id)}}</p>
      <p>Date Reported: {{bug.created_at}}</p>
      <p>Update Status:
          <select v-model="bugForm.status" @change="updateStatus()">
            <option disabled value="">Select an App Status</option>
            <option>Reported</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select><br>
      </p>
    </div>
    <div class="form">
      <textarea class="user-note" rows="4" v-model="noteForm.note" placeholder="Add a note" /><br>
      <button class="button" @click.prevent="createNote">+ Add Note</button>
    </div>
    <div class="report-div" v-for="note in notes" :key="note.id">
      {{note.note}}
      <p>Note By: {{getName(note.user_id)}}<br>Date: {{note.created_at}}</p>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      noteForm: {
        note: "",
        bug_id: null,
        user_id: null
      },
      bugForm: {
        status: ""
      },
      notes: null,
      bug: null
    }
  },
  watch: {
    '$route': 'retrieveNotes'
  },
  created() {
    this.retrieveNotes();
    this.getBug();
  },
  update() {

  },
  methods: {
    ...mapActions({
      retrieveUsers: 'users/retrieveUsers',
      updateBug: 'bugs/updateBug'
    }),
    retrieveNotes() {
      let addr = process.env.VUE_APP_PROD_URL || 'http://localhost:3000';
      axios.get(`${addr}/notes`, { params: { bug_id: this.$route.params.bugId } })
      .then(response => {
        this.notes = response.data;
      })
      .catch(error => console.log(error))
    },
    createNote() {
      let addr = process.env.VUE_APP_PROD_URL || 'http://localhost:3000';
      this.noteForm.bug_id = this.$route.params.bugId;
      this.noteForm.user_id = this.user.id;
      axios.post(`${addr}/notes`, this.noteForm)
      .then(response => {

        if (this.notes == null)
          this.notes = [];
        this.notes.push(response.data);
        this.noteForm.note = "";
        this.noteForm.bug_id = null;
        this.noteForm.user_id = null;
      })
      .catch(error => console.log(error))
    },
    getBug(id) {
      let addr = process.env.VUE_APP_PROD_URL || 'http://localhost:3000';
      axios.get(`${addr}/bugs/${this.$route.params.bugId}`)
      .then(response => {
        this.bug = response.data;
      })
      .catch(error => console.log(error))
    },
    getName(id) {
      if (this.users != null) {
        let name = this.users.find(user => user.id == id);
        return `${name.fname} ${name.lname}`
      }
    },
    updateStatus() {
      this.updateBug({ bugForm: this.bugForm, id: this.bug.id })
      .then(response => {
        if (!response.error)
          this.bug = response.data;
      }).catch(() => {
        console.log('error')
      })
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      users: 'users/getUsers'
    })
  }
}
</script>
<style scoped>
  .report-container {
    min-height: 80vh;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .report-div {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 20px;
    padding: 20px;
    box-shadow: 4px 4px 4px #eeeeee;
    border: 1px solid #eeeeee;
    border-radius: 10px;
  }

  .form {
    width: 81%;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  .user-note {
    width: 100%;
    max-width: none;
    border-radius: 10px;
    box-shadow: 4px 4px 4px #eeeeee;
    border: 1px solid #eeeeee;
    padding: 10px;
    margin-bottom: 5px;
    box-sizing: border-box;
  }

  .button {
    margin: 1%;
  }
</style>