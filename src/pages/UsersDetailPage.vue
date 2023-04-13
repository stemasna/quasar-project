<template>
  <q-page padding>
    <div class="row">
      <div class="text-weight-bold text-h4">
        {{ $t("common.userDetail") }}
      </div>
    </div>
    <div class="row q-col-gutter-md q-mt-md">
      <q-input
        class="col-12 col-md-4"
        ref="nameRef"
        :rules="[notEmpty]"
        v-model="user.name"
        :label="$t('common.name')"
        outlined
        dense
      />
      <q-input
        class="col-12 col-md-4"
        ref="surnameRef"
        :rules="[notEmpty]"
        v-model="user.surname"
        :label="$t('common.surname')"
        outlined
        dense
      />
      <q-input
        class="col-12 col-md-4"
        ref="emailRef"
        :rules="[notEmpty, validEmail]"
        v-model="user.email"
        :label="$t('common.email')"
        outlined
        dense
      />
      <q-input
        class="col-12 col-md-4"
        ref="passwordRef"
        :rules="[notEmpty]"
        v-if="isAdd"
        v-model="user.password"
        :label="$t('common.password')"
        outlined
        dense
      />
      <q-input
        class="col-12 col-md-4"
        :rules="[]"
        v-model="user.telephone"
        :label="$t('common.telephone')"
        outlined
        dense
      />
      <q-input
        class="col-12"
        :rules="[]"
        v-model="user.description"
        type="textarea"
        :label="$t('common.description')"
        outlined
        dense
      />
    </div>
    <div class="row q-mt-md justify-end">
      <q-btn
        :label="$t('common.cancel')"
        color="primary"
        @click="() => router.back()"
        :loading="loading"
      />
      <q-btn
        :label="$t('common.save')"
        color="primary"
        @click="onClickSave"
        :loading="loading"
      />
    </div>
  </q-page>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { api } from "boot/axios";
import { useRouter, useRoute } from "vue-router";
import { t } from "boot/i18n";

export default defineComponent({
  name: "UsersDetailPage",
  setup() {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const router = useRouter();
    const route = useRoute();
    const loading = ref(false);
    const nameRef = ref(null);
    const surnameRef = ref(null);
    const emailRef = ref(null);
    const passwordRef = ref(null);
    const isAdd = computed(() => route.params.id === "new");

    const user = ref({
      name: undefined,
      surname: undefined,
      email: undefined,
      password: undefined,
      description: undefined,
      telephone: undefined,
      role: "user",
    });

    const notEmpty = (val) => !!val || t("common.requiredField");
    const validEmail = (val) =>
      emailRegex.test(val) || t("common.invalidEmail");

    const isValid = () => {
      const fieldsIsValid = [];
      fieldsIsValid.push(nameRef.value.validate());
      fieldsIsValid.push(surnameRef.value.validate());
      fieldsIsValid.push(emailRef.value.validate());
      isAdd.value && fieldsIsValid.push(passwordRef.value.validate());

      return fieldsIsValid.every((f) => f === true);
    };

    const createUser = async () => {
      const { data } = await api.post("users", user.value);
      return data;
    };

    const updateUser = async () => {
      const { id } = route.params;
      const { data } = await api.put(`users/${id}`, user.value);
      return data;
    };

    const onClickSave = async () => {
      if (!isValid()) return;
      try {
        loading.value = true;
        isAdd.value ? await createUser() : await updateUser();
        loading.value = false;
        router.back();
      } catch (e) {
        console.error({ e });
        loading.value = false;
      }
    };

    const getUser = async () => {
      try {
        if (isAdd.value) {
          return;
        }
        const { data } = await api.get(`users/${route.params.id}`);
        user.value = { ...data };
      } catch (e) {
        console.error({ e });
      }
    };

    getUser();

    return {
      router,
      route,
      user,
      loading,
      notEmpty,
      validEmail,
      onClickSave,

      nameRef,
      surnameRef,
      emailRef,
      passwordRef,
      isAdd,
    };
  },
});
</script>
