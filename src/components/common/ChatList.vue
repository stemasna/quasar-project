<template>
  <template v-for="chat of chats" :key="chat?._id">
    <div class="row cursor-pointer q-pa-sm q-col-gutter-sm" style="border-bottom: 1px solid lightgray" @click="() => onClickChat(chat)">
      <div>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar.png" alt="avatar">
        </q-avatar>
      </div>
      <div class="col column justify-between">
        <div>
          {{getUserFromChat(chat)?.name || ''}}
          {{getUserFromChat(chat)?.surname || ''}}
        </div>
        <div>
          <div class="text-subtitle2" v-if="chat?.lastMessage">{{chat?.lastMessage?.text}}</div>
          <div class="text-subtitle2" v-else>{{$t('common.writeFirst')}}</div>
        </div>
      </div>
    </div>
  </template>
</template>

<script>
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, ref} from "vue";

export default {
  name: 'ChatList',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const getChats = async () => {
      await store.dispatch('getMyChats')
    }

    const getUserFromChat = (chat) => {
      const participant =  (chat?.participants || []).find(p => !p?.isMe)
      return participant?.user || {}
    }

    const onClickChat = (chat) => {
      store.commit('setCurrentChatId', chat._id)
    }

    const chats = computed(() => store.getters.chats)

    getChats()

    return {
      store,
      router,
      route,
      chats,
      onClickChat,
      getUserFromChat
    }
  }
}
</script>

<style scoped lang="scss">

</style>
