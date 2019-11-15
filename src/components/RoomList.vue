<template>
  <div class="room-list">
   <div class="row">
     <div class="col-md-3">
   
      <h2 class="text-primary text-center">Chat Rooms</h2>
      <section class="rooms" v-cloak>
        <ul class="list-group">
          <li v-for="room, index in rooms" class="list-group-item" v-bind:class="{ active: room.id == selectedRoom.id }" :key="room.id" @click="selectRoom(index)">
            {{ room.name }}
          </li>
        </ul>
      </section>
        <input class="form-control"
          autocomplete="off"
          placeholder="Enter new room name..."
          v-model="newRoom">
          <div class="btn btn-primary" @click="addRoom">Create New Room</div>
     </div>
     
      <div class="col-md-9 text-left chat">
        <h2 class="text-primary text-center">Messages in {{ selectedRoom.name }}</h2>
        <div class="card">
            <div class="card-body">
                <p class="nomessages text-secondary" v-if="messages.length == 0">
                    [No messages yet!]
                </p>
                <div class="messages" v-chat-scroll="{always: false, smooth: true}">
                    <div v-for="message in messages" :key="message.id">
                        <span class="text-info">[{{ message.username }}]: </span>
                        <span>{{message.text}}</span>
                        <span class="text-secondary time">{{message.created_at | timestamp }}</span>
                    </div>
                </div>
            </div>
            <div class="card-action">
              <!-- <CreateMessage :name="name"/> -->
              <input type="text" name="message" 
                class="form-control"
                autocomplete="off"
                placeholder="Enter message ..."
                v-model="newMessage"
                @keyup.enter="addMessage">
            </div>
        </div>
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
      
      newMessage: "",
      ws: null,
    }
  },
  methods: {
    addRoom() {
      if (!this.newRoom) {
        console.log("Room name is empty")
        return
      }

      var room = { name: this.newRoom }
      this.newRoom = ""

      this.$http.post('/api/v1/rooms', room)
        .then(response => {
          this.rooms.push(response.data)
        }).catch(error => {
          this.backToHome()
        })
    },
    selectRoom(index) {
      this.$store.commit('setSelectedRoom', this.rooms[index]);
      this.$store.commit('clearMessages');
      this.$http.get("/api/v1/rooms/" + this.selectedRoom.id + "/messages")
        .then(response => 
        {
          this.$store.commit('setMessages', response.data.messages.reverse());
        }).catch(error => {
          this.backToHome()
        })
    },
    addMessage() {
      var message = { 
        text: this.newMessage,
      }
      this.newMessage = ""

      this.$http.post('/api/v1/rooms/' + this.selectedRoom.id + '/messages', message)
        .then(response => {
        }).catch(error => {
          this.backToHome()
        })
    },
    backToHome() {
      console.log("Back to home...")
      this.$router.push({ name: 'home' })
    }
  },
  mounted () {
    this.$http.get('/api/v1/rooms')
      .then(response => {
        this.rooms = response.data.rooms
        
        if (this.rooms.length > 0) {
          this.selectRoom(0)
        }
      }).catch(error => (this.backToHome()))
  },
  computed: {
    messages() { return this.$store.state.messages; },
    selectedRoom() { return this.$store.state.selectedRoom; },
  }
};
</script>

<style scoped>

.rooms{
    max-height: 300px;
    overflow: auto;
}

.chat .time{
    display: block;
    font-size: 0.7em;
}

.messages{
    min-height: 300px;
    max-height: 300px;
    overflow: auto;
}
</style>