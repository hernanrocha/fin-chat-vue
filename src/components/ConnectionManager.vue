<template>
  <v-container>
    <v-row>
      <v-col>
        <v-alert v-if="isNoConnected" dense type="error" class="text-center"><span @click="connect">You are not connected. Please click here to reconnect</span></v-alert>
        <v-alert v-if="isConnecting" dense type="info" class="text-center">Trying to connect. Please wait a few seconds...</v-alert>
      </v-col>
    </v-row>
  </v-container>
  </div> 
</template>

<style scoped>
  .v-alert.error {
    cursor: pointer;
  }
</style>

<script>
import { CONNECTION_STATUS } from '@/plugins/store';
export default {
  data() {
    return {
    }
  },
  computed: {
    connectionStatus() { return this.$store.state.connectionStatus },
    isConnected() { return this.connectionStatus == CONNECTION_STATUS.CONNECTED; },
    isConnecting() { return this.connectionStatus == CONNECTION_STATUS.CONNECTING; },
    isNoConnected() { return this.connectionStatus == CONNECTION_STATUS.NO_CONNECTED; }
  },
  mounted() {
    this.connect();
  },
  methods: {
    connect() {
      this.$store.dispatch('connect');
    }
  }
}
</script>