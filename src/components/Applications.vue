<template>
  <div class="app-container">
    <Modal headerText="Add New App"
           buttonText="+ Add App"
           buttonClass=""
    />
    <br><br>
    <table v-if="apps != null && apps.length > 0" class="table">
      <thead>
        <th>App Name</th>
        <th>URL</th>
        <th>Repo</th>
        <th>Status</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="app in apps" :key="app.id">
          <td data-label="App Name">
            <router-link :to="{ name: 'BugReportApp', params: { appName: app.name, appId: app.id }}">
              {{app.name}}
            </router-link>
          </td>
          <td data-label="App URL">{{app.url}}</td>
          <td data-label="App Repo">{{app.repo}}</td>
          <td data-label="App Status">
            <span v-if="app.status === 'Live/Active'" class="status status-green">Live</span>
            <span v-else-if="app.status === 'In Production'" class="status status-yellow">In Production</span>
            <span v-else class="status status-red">Discontinued</span>
          </td>
          <td>
            <Modal headerText="Edit App Info"
                   buttonText="Edit Info"
                   buttonClass="edit-btn"
                   v-bind:app="{ id: app.id, name: app.name, url: app.url, repo: app.repo, status: app.status }"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <h2 v-else>Looks like you have no apps yet.</h2>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Modal from './Modal';

export default {
  name: 'Applications',
  data() {
    return {
      appForm: {
        name: "",
        url: "",
        repo: "",
        status: ""
      }
    }
  },
  computed: {
    ...mapGetters({
      apps: 'apps/getApps'
    })
  },
  components: {
    Modal: Modal
  }
}
</script>

<style scoped>
  .app-container {
    min-height: 80vh;
    padding-bottom: 30px;
    padding-top: 30px;
  }
</style>