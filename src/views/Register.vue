<template>
  <div class="container">
    <div class="card login">
      <div class="card-body">
        <h2 class="card-title text-center">Register</h2>
        <form @submit.prevent="register" class="text-center">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Enter Username" name="username" v-model="username">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Enter Email" name="email" v-model="email">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="Enter Password" name="password" v-model="password">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Enter First Name (optional)" name="first_name" v-model="first_name">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Enter Last Name (optional)" name="last_name" v-model="last_name">
          </div>
          <p v-if="errorText" class="text-danger">{{ errorText }}</p>
          <button class="btn btn-primary">Register</button>
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
        email: "",
        first_name: "",
        last_name: "",
        errorText: null
      }
  },
  methods: {
    register() {
      if (!this.username || !this.password || !this.email) {
        this.errorText = "Username, email and password are required!"
        return
      }
      this.errorText = ""

      var req = { 
          username: this.username, 
          password: this.password,
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
      }
      this.$http.post("/register", req)
        .then(response => {
          console.log(response.data)
          this.$router.push({ name: 'home' })
        })
        .catch(err => {
          this.errorText = "Register failed!"
          console.log(err)
        })
    }
  }
}
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
