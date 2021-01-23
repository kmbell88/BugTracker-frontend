<template>
  <footer>
    <ul>
      <li>&copy;2021 Ken Bell: Designer &amp; Engineer</li>
      <li><a href="https://github.com/kmbell88?tab=repositories" target="_blank">View Source Code on GitHub</a></li>
      <li><a href="https://github.com/kmbell88/BugTracker-frontend/blob/main/BugTrackerOverview.pdf" target="_blank">View BugTracker Design Overview</a></li>
    </ul>
  </footer>
</template>

<script>

export default {
  name: 'Footer',
  data: () => ({
    //
  }),
}
</script>

<style scoped>
  footer {
    background-color: #166abd;
    color: #ffffff;
    margin: 0 auto;
    text-align: center;
    padding-top: 40px;
    padding-bottom: 35px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    text-decoration: none;
    display: inline-block;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 5px;
  }

  a {
    color: #ffffff;
    text-decoration: none;
  }
</style>