<template>
  <v-container>
    <v-row justify="center">
      <v-col md="6">

        <v-card outlined :loading="loading">
          <v-card-title><span class="headline">Register</span></v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field v-model="email" label="Email" required></v-text-field>
                  </v-col>
                </v-row>
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
                <v-row>
                  <v-col>
                    <v-text-field v-model="first_name" label="First Name (optional)"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field v-model="last_name" label="Last Name (optional)"></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="errorText">
                  <v-col>
                    <v-alert type="error" tile>{{errorText}}</v-alert>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn color="primary" class="mr-4" @click="register">
                    Register
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
        email: "",
        first_name: "",
        last_name: "",
        errorText: null,
        loading: false,
      }
  },
  methods: {
    register() {
      if (!this.username || !this.password || !this.email) {
        this.errorText = "Username, email and password are required!"
        return
      }
      this.loading = true;
      this.errorText = "";

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
          this.loading = false;
          this.$router.push({ name: 'home' })
        })
        .catch(err => {
          this.loading = false;
          this.errorText = "Register failed!"
          console.log(err)
        })
    }
  }
}
</script>
