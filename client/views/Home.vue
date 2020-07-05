<template>
  <div class="home">
    <h3>Favorites cities</h3>
    <div class="favorites">
      <div class="bloc" v-for="item in datass" :key="item.name">
        {{ item.name }} : {{ item.main.temp }} °C  <button @click="deleteCity(item.name)" class="btndel"><i class="fa fa-trash"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      appName: "Weather App",
      datass: []
    }
  },
  components: {
    
  },
  methods: {
    async deleteCity(cityName) {
      this.$store.dispatch("delete", {name: cityName}).then(() => {
        console.log("deleted")
        this.datass.forEach((element, i) => {
          if(this.datass[i].name == cityName) {
            this.datass.splice(i,1);
          }
        });
      }).catch(() => {
        console.log("error")
      })
    }
  },
  beforeMount() {
    axios
      .get(`http://localhost:5000/api/users/cities/${this.$store.state.email}`)
      .then((response) => {
          response.data.forEach(obj => {
            //console.log(obj.name)
            if (obj.name) {
                var key = "64a8e13502e47c84bdedd706c3e67ec9";
                var link = `http://api.openweathermap.org/data/2.5/weather?q=${obj.name}&APPID=${key}&units=metric`
                
                axios
                  .get(link)
                  .then((response2) => {
                      this.datass.push({name: response2.data.name, main: response2.data.main})
                  })
                  .catch(() => {
                      this.error = "Not found..."
                  })
            }
          });
      })
      .catch(() => {
          console.log("error")
      })
  }
}
</script>

<style scoped>
.btndel {
  border:none;
  background: none;
}
</style>