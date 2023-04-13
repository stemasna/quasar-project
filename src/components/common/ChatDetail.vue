<template>
  <div v-if="messages.length === 0">
    <div class="q-pa-sm text-grey">
      Nessun messaggio presente
    </div>
  </div>
  <div v-for="message of messages" :key="message._id">
    <q-chat-message
      :name="isMyMessage(message) ? 'Me' : message?.sender?.name"
      :text="[message?.message]"
    />
  </div>
  <div class="absolute-bottom">
    <div class="row">
      <div class="col-4"/>
      <div class="col-8">
        <q-input
          v-model="newMessage"
          filled
          type="textarea"
          label="Scrivi un messaggio"
          @keyup.enter="sendMessage"
        >
          <template v-slot:append>
            <q-btn icon="send" @click="sendMessage" round flat/>
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>

<script>
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, ref, watch} from "vue";
import {api} from "boot/axios";

export default {
  name: 'ChatDetail',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const messages = ref([])
    const newMessage = ref(undefined)

    const { details } = store.getters
    const currentChatId = computed(() => store.getters.currentChatId)

    const getChatMessages = async () => {
      if(!currentChatId.value) return
      const { data } = await api.get(`chatmessages/${currentChatId.value}/messages`, {
        params: {
          sort: 'timestamp'
        }
      })
      console.debug({data})
      messages.value = [...data]
    }

    const isMyMessage = (message) => {
      return message.senderId === details?._id
    }

    const sendMessage = async () => {
      console.debug({currentChatId})
      if(!currentChatId.value) return
      const { data: chat } = await api.post(`chatmessages/${currentChatId.value}/messages`, {
        message: newMessage.value
      })
      const message = chat.lastMessage
      messages.value = [...messages.value, message]
    }

    watch(currentChatId, (newValue) => {
      console.debug('getChats', newValue)
      getChatMessages(newValue)
    })

    getChatMessages()

    return {
      route,
      router,
      store,
      messages,
      newMessage,
      sendMessage,
      currentChatId,
      isMyMessage
    }
  }
}
</script>

<style scoped lang="scss">

</style>
