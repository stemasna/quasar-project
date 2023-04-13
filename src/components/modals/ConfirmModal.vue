<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="border-radius: 0.5rem">
      <q-card flat bordered style="border-radius: 0.5rem" class="q-pa-md">
        <div class="row justify-center">
          <div class="col-12 text-weight-bold text-h5">
            {{ title }}
          </div>
          <div class="col-12 text">
            {{ text }}
          </div>
        </div>
      </q-card>
      <q-card-actions align="right">
        <q-btn
          color="primary"
          label="OK"
          @click="onClickSave"
          :loading="loading"
        />
        <q-btn
          color="primary"
          :label="$t('common.cancel')"
          @click="onCancelClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from "quasar";
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "ConfirmModal",
  props: {
    title: String,
    text: String,
    onConfirm: Function,
  },
  emits: [...useDialogPluginComponent.emits],
  setup(props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    const router = useRouter();
    const route = useRoute();
    const loading = ref(false);
    const emailRef = ref(null);
    const passwordRef = ref(null);

    const user = ref({
      email: undefined,
      password: undefined,
    });

    const onClickSave = async () => {
      try {
        loading.value = true;
        await props.onConfirm();
        onDialogOK();
        loading.value = false;
      } catch (e) {
        console.error({ e });
        loading.value = false;
      }
    };

    return {
      dialogRef,
      onDialogHide,
      onCancelClick: onDialogCancel,
      router,
      route,
      user,
      loading,
      onClickSave,
      emailRef,
      passwordRef,
    };
  },
});
</script>

<style scoped lang="scss"></style>
