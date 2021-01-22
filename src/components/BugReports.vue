<template>
  <div class="reports-container">
    <BugModal headerText="+ Report Bug"
              buttonText="+ Report Bug"
              buttonClass=""
    />
    <br><br>
    <table v-if="bugs != null && bugs.length > 0 && (!$route.params.appId || bugs.some(bug => bug.app_id == $route.params.appId))" class="table">
      <thead>
        <th>Issue</th>
        <th>App</th>
        <th>Date Reported</th>
        <th>Reported By</th>
        <th>Bug Status</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="bug in bugs" :key="bug.id">
          <template v-if="!$route.params.appId || bug.app_id == $route.params.appId">
            <td data-label="Issue">
              <router-link :to="{ name: 'BugReport', params: { appName: appName(bug.app_id), bugId: bug.id }}">
                {{bug.issue}}
              </router-link>
            </td>
            <td data-label="App">{{appName(bug.app_id)}}</td>
            <td data-label="Date Reported">{{bug.created_at}}</td>
            <td data-label="Reported By">{{getBugAuthor(bug.user_id)}}</td>
            <td data-label="Bug status">
              <div v-if="bug.status === 'Resolved'" class="status status-green">Resolved</div>
              <div v-else-if="bug.status === 'In Progress'" class="status status-yellow">In Progress</div>
              <div v-else class="status status-red">Reported</div>
            </td>
            <td>
              <BugModal v-if="isBugOwner(bug)"
                    headerText="Edit Bug Info"
                    buttonText="Edit Info"
                    buttonClass="edit-btn"
                    v-bind:bug="{ 
                                  id: bug.id,
                                  issue: bug.issue,
                                  description: bug.description,
                                  location: bug.location,
                                  status: bug.status,
                                  app_id: bug.app_id,
                                  user_id: bug.user_id
                                }"
              />
            </td>
          </template>
        </tr>
      </tbody>
    </table>
    <h2 v-else>Looks like you have no bugs!</h2>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BugModal from './BugModal';

export default {
  name: 'BugReports',
  data() {
    return {
      bugForm: {
        issue: "",
        description: "",
        location: "",
        status: "",
        app_id: null,
        user_id: null
      }
    }
  },
  watch: {

  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      users: 'users/getUsers',
      bugs: 'bugs/getBugs',
      apps: 'apps/getApps'
    }),
  },
  methods: {
    isBugOwner(bug) {
      return this.user.id === bug.user_id;
    },
    appName(id) {
      return this.apps.find(app => app.id === id).name;
    },
    getBugAuthor(id) {
      let author = this.users.find(user => user.id === id);
      return `${author.fname} ${author.lname}`
    }
  },
  components: {
    BugModal: BugModal
  }
}
</script>

<style scoped>
  .reports-container {
    min-height: 80vh;
    padding-top: 30px;
    padding-bottom: 30px;
  }

</style>