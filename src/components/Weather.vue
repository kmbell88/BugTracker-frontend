<template>
  <div class="weather-container" v-if="Object.entries(weather).length != 0 && user.zipCode != 0">
    <img :src="weatherIcon" :alt="weatherAlt" style="width: 50%;" /><span class="temp">{{ currentWeather }}&#8457;</span>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    weather: {}
  }),
  created() {
    this.initialize();
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    }),
    currentWeather() {
      return Math.floor((this.weather.main.temp - 273.15) * 9 / 5 + 32);
    },
    weatherIcon() {
      return `http://openweathermap.org/img/wn/${this.weather.weather[0].icon}@2x.png`;
    },
    weatherAlt() {
      return this.weather.weather[0].description;
    }
  },
  methods: {
    initialize() {
      let instance = axios.create();
      delete instance.defaults.headers.common['Authorization'];
      
      let zip = this.user.zipCode;
      return instance
        .get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=a0f413066611adfff0f8926643f650b3`) // Put app key in .env file
        .then(res => {
          this.weather = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
<style scoped>
  .weather-container {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1em;
  }
</style>