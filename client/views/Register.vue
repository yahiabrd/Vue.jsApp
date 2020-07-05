<template>
  <div class="container register">
    <h1>Register page</h1>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error }}
    </div>
    <div class="alert alert-success" role="alert" v-if="success">
      {{ success }}
    </div>
    <div class="form-group">
      <input type="text" class="form-control" v-model="firstname" name="firstname" placeholder="Enter first name">
    </div>
    <div class="form-group">
      <input type="text" class="form-control" v-model="lastname" name="lastname" placeholder="Enter last name">
    </div>
    <div class="form-group">
      <input type="email" class="form-control" v-model="email" name="email" placeholder="Enter email">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" v-model="password" name="password" placeholder="Password">
    </div>
    <button type="submit" class="btn btn-primary" @click="register">Register</button>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      error: '',
      success: '',
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async register() {
      this.$store.dispatch("register", {firstname: this.firstname, lastname: this.lastname, email: this.email, password: this.password}).then(() => {
        this.success = "Account successfully created"
      }).catch(() => {
        this.error = "Error..."
      })
    }
  }
}
</script>