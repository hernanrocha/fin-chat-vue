<template>
  <div class="room-list">
   <div class="row">
     <div class="col-md-6">
   
      <h1>Salas de Chat</h1>
      <section class="main" v-cloak>
        <ul>
          <li v-for="room, index in rooms" class="room" :key="room.id" @click="selectRoom(index)">
            {{ room.name }}
          </li>
        </ul>
      </section>
        <input class="new-room"
          autocomplete="off"
          placeholder="Nombre de la sala"
          v-model="newRoom">
          <div class="btn btn-primary" @click="addRoom">Crear Sala</div>
     </div>
     <div class="col-md-6">
       <h2>Mensajes en {{ selectedRoom.name }}</h2>
       
        <ul>
          <li v-for="message in messages" class="message" :key="message.id">
            Usuario {{ message.user_id }} dijo: {{ message.text }}
          </li>
        </ul>

        <input class="new-message"
          autocomplete="off"
          placeholder="Escribe un mensaje"
          v-model="newMessage">
          <div class="btn btn-primary" @click="addMessage">Send</div>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rooms: [],
      newRoom: "",
      selectedRoom: {
        id: 1,
        name: "Mesa por default",
      },
      messages: [],
      newMessage: "",
    }
  },
  methods: {
    addRoom() {
      console.log("Adding room" + this.newRoom)
      var room = { name: this.newRoom }
      this.newRoom = ""

      this.$http.post('http://localhost:8001/api/v1/rooms', room)
        .then(response => {
          this.rooms.push(response.data)
        }).finally(() => {
        })
    },
    selectRoom(index) {
      this.selectedRoom = this.rooms[index]
      this.$http.get("http://localhost:8001/api/v1/rooms/" + this.selectedRoom.id + "/messages")
        .then(response => {
          console.log(response.data)
          this.messages = response.data.messages
        })
    },
    addMessage() {
      console.log("Adding message" + this.newMessage)
      var message = { 
        text: this.newMessage,
        user_id: 1,
        room_id: this.selectedRoom.id,
      }
      this.newMessage = ""

      this.$http.post('http://localhost:8001/api/v1/messages', message)
        .then(response => {
          this.messages.push(response.data)
        }).finally(() => {
        })
    }
  },
  mounted () {
    this.$http.get('http://localhost:8001/api/v1/rooms')
      .then(response => {
        this.rooms = response.data.rooms
        this.selectRoom(0)
      })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
