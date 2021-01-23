<template>
<div class="home">
  <div class="hero-container flex-container">
    <div class="hero flex-container">
      <div>
        <img :src="hero" class="hero-img">
      </div>
      <div>
      <h1>Bug Tracking Made Easy</h1>
      <h3>
        BugTracker is a quick, simple, and practical way of documenting bugs and fixes during an application's development lifecycle!
      </h3>
      </div>
    </div>
  </div>
  <div class="cards flex-container">
    <div class="flex-item">
      <img :src="clipboard" class="card-img">
      <h3 class="card-title">Report a Bug</h3>
      <div>
        As troublesome as they may be, bugs are a natural and costly part of the development process. The best way to correct a bug is to first report it and let others know ASAP! BugTracker makes this easy!
      </div>
    </div>
    <div class="flex-item">
      <img :src="employees" class="card-img">
      <h3 class="card-title">Fix It as a Team</h3>
      <div>
        Sometimes a bug can be tough and may require backup. Once a bug has been reported, it is available for your whole team to see and apply notes to!
      </div>
    </div>
    <div class="flex-item">
      <img :src="shield" class="card-img">
      <h3 class="card-title">Keep Your Apps Secure</h3>
      <div>
        Those who do not learn from their bugs are doomed to repeat them. BugTracker maintains a history of bug reports that can be accessed whenever needed! Keep your future apps clean by referencing the bugs of Christmas past!
      </div>
    </div>
  </div>
</div>
</template>
<script>
import hero from "../assets/images/ladybug.png";
import blueDots from "../assets/images/blueDots.png";
import clipboard from "../assets/images/clipboard.svg";
import employees from "../assets/images/employees.svg";
import shield from "../assets/images/shield.svg";

export default {
  name: 'Home',
  data: () => ({
    hero: hero,
    blueDots: blueDots,
    clipboard: clipboard,
    employees: employees,
    shield: shield
  })
}
</script>
<style scoped>
  .flex-container {
    display: flex;
    justify-content: center;
    align-items: stretch;
  }

  .flex-item {
    border: 1px solid #eeeeee;
    width: 30%;
    padding: 20px;
    margin: 10px;
    border-radius: 5px;
    background-color: #ffffff;
  }

  .home {
    min-height: 80vh;
    width: 100%;
    margin: 0 auto;
    line-height: 1.4;
  }

  .hero-container {
    min-height: 60vh;
    padding: 40px;
    background: url("../assets/images/blueDots.png");
    margin: 0 auto;
  }

  .hero {
    max-width: 1440px;
    margin: 0 auto;
    align-items: center;
    text-align: center;
  }

  .hero h1 {
    color: #ffffff;
    text-shadow: 1px 1px 1px #444444;
    text-align: center;
    font-size: 2.5em;
    letter-spacing: 0.5px;
  }

  .hero h3 {
    color: #ffffff;
    text-shadow: 1px 1px 1px #444444;
    font-size: 1.5em;
    letter-spacing: 0.5px;
  }

  .cards {
    padding: 20px;
    margin: 0 auto;
    background-color: #37aac5
  }

  img.card-img {
    display: block;
    margin: 0 auto;
    width: 250px;
  }

  .card-title {
    text-align: center;
  }

  @media (max-width: 925px) {
  .flex-container{
    flex-direction: column;
    align-items: center;
  }

  .flex-item {
    width: 85%;
  }

  .hero-img {
    width: 100%;
  }
}
</style>