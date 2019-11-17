<template>
<div>
  <div v-if='state == 0'>
    <h3>Welcome, please choose your username!</h3>
    <form @submit.prevent='setUsername'>
        <input type='text' placeholder="Username..." v-model="username"/>
        <input type='submit' value='Join'/>
    </form>
    <button @click='continueWithoutUsername'>Join as a Guest</button>
  </div>
  <div v-if='state == 1'>
    {{ msg }}
    <ul id='chatbox'>
        <li v-for="message in messageList" :key='message'>
            <b>{{message.user}}:</b> {{message.message}}
        </li>
    </ul>
    <form @submit.prevent="sendMessage">
        <input type="text" placeholder="Message..." v-model="message" ref="tb"/>
        <input type="submit" value="Send"/>
    </form>
  </div>
</div>
</template>

<script src="/socket.io/socket.io.js"></script>
<script>
var socket = null;
export default {
  name: 'chatLogin',
  props: {
    msg: String
  },
  data() {
    return {
      message: '',
      messageList: [],
      username: '',
      state: 0,
    }
  },
  methods: {
      sendMessage() {
          socket.emit('message', this.message);
          this.message = '';
      },
      setUsername() {
          socket.emit('join', this.username);
          this.username = '';
          this.state = 1;
      },
      continueWithoutUsername() {
          socket.emit('join', null);
          this.state = 1;
      }
  },
  created() {
      socket = io();
  },
  mounted() {
      socket.on('message', (message) => {
          this.messageList.push(message);
          /*This function just simply calls an action after
          the page renders */
          this.$nextTick(() =>{
              let messageBox = document.getElementById('chatbox');
              messageBox.scrollTop = messageBox.scrollHeight;
          })
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#chatbox {
    height: 200px;
    max-width: 400px;
    overflow-y: scroll;
}
ul{ 
    list-style-type: none; 
}
</style>
