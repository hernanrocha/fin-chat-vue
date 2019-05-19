<template>
  <div class="container">
    <div class="card login">
      <div class="card-body">
        <h2 class="card-title text-center">Login</h2>
        <form @submit.prevent="login" class="text-left">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" placeholder="Enter username" name="username" v-model="username">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Enter password" name="password" v-model="password">
          </div>
          <p v-if="errorText" class="text-danger">{{ errorText }}</p>
          <div class="text-center">
            <button class="btn btn-primary">Enter Chat</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: "",
      password: "",
      errorText: null
    }
  },
  methods: {
    login() {
      if (!this.username || !this.password) {
        this.errorText = "Please enter username and password!"
        return
      }

      var req = { username: this.username, password: this.password }
      this.$http.post("/login", req)
        .then(response => {
          console.log(response.data.token)
          console.log(this.$http.defaults)
          this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
          this.$router.push({ name: 'chat' })
        })
        .catch(err => {
          this.errorText = "Invalid credentials"
          console.log(err)
        })
    }
  }
};
</script>

<style scoped>
.login {
  max-width: 450px;
  margin-top: 50px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
