<template>
  <q-layout view="hHh Lpr fFf">
    <MainHeader />
    <LeftDrawer />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {useStore} from "vuex";
import MainHeader from "components/headers/MainHeader";
import LeftDrawer from "components/drawers/LeftDrawer";

export default defineComponent({
  name: 'MainLayout',
  components: {LeftDrawer, MainHeader},
})
</script>
