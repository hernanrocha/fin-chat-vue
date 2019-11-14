<style>
.v-application a {
  color: white !important;
}
</style>

<template>
  <v-app>
    <v-app-bar app color="info" dark>
      
      <!-- Left -->
      <v-icon color="white">chart-finance</v-icon>  
      <v-toolbar-title>FinChat</v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="inverse--text">
        <router-link to="/">Home</router-link> |
        <router-link to="/register">Register</router-link> |
        <router-link to="/about">About</router-link>
      </div>
        
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
