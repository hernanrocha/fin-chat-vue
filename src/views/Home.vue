<template>
  <v-container>
    <v-row justify="center">
      <v-col md="6">

        <v-card outlined :loading="loading">
          <v-card-title><span class="headline">Login</span></v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field v-model="username" label="Username" required></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="password"
                      :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                      :type="showPassword ? 'text' : 'password'"
                      label="Password"
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="errorText">
                  <v-col>
                    <v-alert type="error" tile>{{errorText}}</v-alert>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn color="primary" class="mr-4" @click="login">
                    Enter Chat
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      username: "",
      password: "",
      errorText: null,
      showPassword: false,
      loading: false,
    }
  },
  methods: {
    login() {
      if (!this.username || !this.password) {
        this.errorText = "Please enter username and password!"
        return
      }
      
      this.loading = true;
      this.errorText = "";

      var req = { username: this.username, password: this.password }
      this.$http.post("/login", req)
        .then(response => {
          console.log(response.data.token)
          console.log(this.$http.defaults)
          this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
          this.$router.push({ name: 'chat' })
          this.loading = false;
        })
        .catch(err => {
          this.errorText = "Invalid credentials"
          this.loading = false;
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
