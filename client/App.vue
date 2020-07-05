<template>
  <div id="app">
      <div id="nav" v-if="$store.state.token">
        <router-link to="/">Home</router-link> |
        <router-link to="/profile">Profile ({{ $store.state.email }})</router-link> |
        <button type="button" class="btn btn-info" @click="$store.commit('logout')">Logout</button>
      </div>
      <div id="nav" v-else>
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link>
      </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "WeatherApp"
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
