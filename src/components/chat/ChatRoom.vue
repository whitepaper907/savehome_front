<!-- <script setup>
import { register } from "vue-advanced-chat";

register()

const username = sessionStorage.getItem("user_name");
console.log(username)
const rooms = []
const messages = ["aaaa"]
const roomActions = [
]

</script>

<template>
<vue-advanced-chat
    :room-id="1"
    :single-room=true
    :currentUserId="{username}"
    :messages="JSON.stringify(messages)"
    :messages-loaded="messagesLoaded"
  />
</template>

<style scoped>

</style> -->

<template>
	<div class="chatDiv">
		<vue-advanced-chat
			height="500px"
      width="400px"
			:current-user-id="currentUserId"
      :show-files="false"
      :show-audio="false"
			:rooms="JSON.stringify(rooms)"
      :single-room="true"
			:rooms-loaded="true"
			:messages="JSON.stringify(messages)"
			:messages-loaded="messagesLoaded"
			@send-message="sendMessage($event.detail[0])"
			@fetch-messages="fetchMessages($event.detail[0])"
		/>
	</div>
</template>

<script>
import { register } from 'vue-advanced-chat'
import { requestAnswer } from '@/api/chat.js'

register()
let userId = sessionStorage.getItem("user_id")
let username = sessionStorage.getItem("user_name")
console.log(userId + " / " + username)
let chatId = 0;

export default {
	data() {
    return {
      userId : sessionStorage.getItem("user_id"),
      username: sessionStorage.getItem("user_name"),
      currentUserId: userId,
			rooms: [
        {
          currentUserId:sessionStorage.getItem("user_id"),
					roomId: "chatbot",
					roomName: 'Chatbot과 상담하기',
					avatar: 'src/assets/chatbot_profile.png',
					users: [
						{ _id: userId, username: username },
					]
				}
			],
			messages: [],
			messagesLoaded: false
		}
	},

	methods: {
    fetchMessages({ options = {} }) {
      setTimeout(() => {
        console.log("fetchMessages")
				// if (options.reset) {
				// 	this.messages = this.addMessages(true)
				// } else {
				// 	this.messages = [...this.addMessages(), ...this.messages]
				// 	this.messagesLoaded = true
        // }
        this.messages = [...this.addMessages(), ...this.messages]
        this.messagesLoaded = true
				// this.addNewMessage()
			})
		},

		// addMessages(reset) {
    addMessages() {
      console.log("addMessage")
      const messages = []
      const date = new Date()
      const hour = `${String(date.getHours() % 12 || 12).padStart(2, '0')}`
      const min = `${String(date.getMinutes()).padStart(2, '0')}`
      const time = hour + ":" + min
      const msgDate = date.toString().substring(0,16)

      messages.push({
        _id: chatId++,
        content: "안녕하세요:)\n 무엇을 도와드릴까요?",
        senderId: "chatbot",
        username: "chatbot",
        date: msgDate,
        timestamp: time
      })

			return messages
		},

    sendMessage(message) {
      userId = sessionStorage.getItem("user_id")
      username = sessionStorage.getItem("user_name")
      // console.log(username+"("+userId+") sendMessage")
			this.messages = [
				...this.messages,
				{
					_id: chatId++,
					content: message.content,
					senderId: sessionStorage.getItem("user_id"),
					timestamp: new Date().toString().substring(16, 21),
					date: new Date().toDateString()
				}
			]

			// console.log(message.content)
			requestAnswer(
				{msg : message.content},
				({data}) => {
					// console.log(data.answer)
					setTimeout(() => {
						this.messages = [
							...this.messages,
							{
								_id: chatId++,
								content: data.answer,
								senderId: "chatbot",
								timestamp: new Date().toString().substring(16, 21),
								date: new Date().toDateString()
							}
						]
					})
				},
				({ err }) => [
					console.log(err)
				]
			)
		},

    addNewMessage() {
      // console.log("addNewMessage")
			setTimeout(() => {
				this.messages = [
					...this.messages,
					{
						_id: chatId++,
						content: 'NEW MESSAGE',
						senderId: "chatbot",
						timestamp: new Date().toString().substring(16, 21),
						date: new Date().toDateString()
					}
				]
			}, 2000)
		}
	}
}
</script>

<style>
.chatDiv{
  width: 400px;
  position: fixed;
  bottom: 110px;
  right: 60px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 99;
}

.vac-message-card{
	background-color: red;
}
</style>