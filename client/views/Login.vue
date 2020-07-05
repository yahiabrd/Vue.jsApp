<template>
  <div class="container login">
    <h1>Login page</h1>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error }}
    </div>
    <div class="form-group">
      <input type="email" class="form-control" name="email" v-model="email" placeholder="Enter email">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" name="password" v-model="password" placeholder="Password">
    </div>
    <button type="submit" class="btn btn-primary" @click="login">Login</button>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      error: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      this.$store.dispatch("login", {email: this.email, password: this.password}).then(() => {
        this.$router.push('profile')
      }).catch(() => {
        this.error = "Bad credentials"
      })
    }
  }
}
</script>