<template>
  <q-page padding>
    <div class="row q-col-gutter-sm full-height">
      <div class="col-4 column flex chat-list">
        <div align="center">
          {{ $t("common.list") }} {{ $t("common.chat") }}
        </div>
        <ChatList />
      </div>
      <div class="col-8 column flex">
        <div align="center">{{ $t("common.chat") }}</div>
        <ChatDetail v-if="currentChatId" />
      </div>
    </div>
  </q-page>
</template>

<script>
import ChatList from "components/common/ChatList";
import ChatDetail from "components/common/ChatDetail";
import { mapGetters } from "vuex";
export default {
  name: "ChatsPage",
  components: { ChatDetail, ChatList },
  computed: {
    ...mapGetters(["currentChatId"]),
  },
};
</script>

<style scoped lang="scss">
.chat-list {
  border-right: 1px solid lightgray;
  height: 100%;
  min-height: 95vh;
}
</style>
