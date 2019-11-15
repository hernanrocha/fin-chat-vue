import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export const CONNECTION_STATUS = {
  NO_CONNECTED: 1,
  CONNECTING: 2,
  CONNECTED: 3
}

let ws;

const store = new Vuex.Store({
  state: {
    messages: [],
    selectedRoom: {
      id: 0,
      name: "",
    },
    connectionStatus: CONNECTION_STATUS.NO_CONNECTED,
  },
  mutations: {
    addMessage (state, message) {
      if (state.selectedRoom.id != message.room_id) {
        console.log('Discarded message');
        return;
      }
      state.messages.push(message);
    },
    setMessages (state, messages) {
      state.messages = messages;
    },
    clearMessages (state) {
      state.messages = [];
    },
    setConnectionStatus(state, status) {
      state.connectionStatus = status;
    },
    setSelectedRoom(state, room) {
      state.selectedRoom = room; 
    }
  },
  actions: {
    connect(context) {
      console.log('STORE CONNECT')
      if (context.state.connectionStatus != CONNECTION_STATUS.NO_CONNECTED) {
        return;
      }

      context.commit('setConnectionStatus', CONNECTION_STATUS.CONNECTING);

      ws = new WebSocket(process.env.VUE_APP_WS_URL);
      ws.addEventListener('message', e => {
        console.log('STORE WEBSOCKET MESSAGE');
        let m = JSON.parse(e.data);
        context.commit('addMessage', m);
      });
      ws.addEventListener('error', e => {
        console.log('STORE WEBSOCKET ERROR');
        console.log({e});
        context.commit('setConnectionStatus', CONNECTION_STATUS.NO_CONNECTED);
      });
      ws.addEventListener('close', e => {
        console.log('STORE WEBSOCKET CLOSE');
        context.commit('setConnectionStatus', CONNECTION_STATUS.NO_CONNECTED);
      });
      ws.addEventListener('open', e => {
        console.log('WEBSOCKET OPEN');
        context.commit('setConnectionStatus', CONNECTION_STATUS.CONNECTED);
      });
    },
  }
})

export default store;
