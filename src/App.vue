<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>
<style>
* {
  font-family: Arial, Helvetica, sans-serif;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  position: relative;
  width: 100%;
  min-height: 80vh;
}

</style>