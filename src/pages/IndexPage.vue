<template>
  <q-page class="flex" padding>
    {{ $t("welcome") }} {{ $t("to") }} {{ $t("my") }} {{ $t("app") }}
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>
