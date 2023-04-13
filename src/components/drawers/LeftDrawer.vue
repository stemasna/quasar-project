<template>
  <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
    <q-item
      :to="{ name: 'entry' }"
      :class="{ 'text-weight-bold': ['entry'].includes(route.name) }"
    >
      <q-item-section avatar>
        <q-icon name="home" size="md" />
      </q-item-section>

      <q-item-section>
        {{ $t("common.index") }}
      </q-item-section>
    </q-item>
    <q-item
      :to="{ name: 'users' }"
      :class="{
        'text-weight-bold': ['users', 'usersDetail'].includes(route.name),
      }"
    >
      <q-item-section avatar>
        <q-icon name="person" size="md" />
      </q-item-section>

      <q-item-section>
        {{ $t("common.userList") }}
      </q-item-section>
    </q-item>
    <q-item
      :to="{ name: 'chats' }"
      :class="{ 'text-weight-bold': ['chats'].includes(route.name) }"
    >
      <q-item-section avatar>
        <q-icon name="message" size="sm" class="q-ml-xs" />
      </q-item-section>

      <q-item-section>
        {{ $t("common.chats") }}
      </q-item-section>
    </q-item>
  </q-drawer>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LeftDrawer",
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRouter();

    return {
      router,
      route,
      leftDrawerOpen: computed(() => store.getters.leftDrawerOpen),
    };
  },
});
</script>

<style scoped lang="scss"></style>
