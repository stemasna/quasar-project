<template>
  <q-page padding class="full-height row flex items-center justify-center">
    <q-card flat class="col-12 col-md-4 q-pa-md q-py-lg" bordered style="border-radius: 0.5rem">
      <div class="row justify-center">
        <div class="text-weight-bold text-h4">
          {{$t('common.login')}}
        </div>
      </div>
      <div class="row q-col-gutter-md q-mt-md">
        <q-input class="col-12 col-md-12" ref="emailRef" :rules="[notEmpty, validEmail]" v-model="user.email" :label="$t('common.email')" outlined dense/>
        <q-input class="col-12 col-md-12" ref="passwordRef" :rules="[notEmpty]" v-model="user.password" :label="$t('common.password')" outlined dense/>
      </div>
      <div class="row q-mt-md justify-center">
        <q-btn :label="$t('common.login')" color="primary" @click="onClickSave" :loading="loading"/>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {t} from "boot/i18n";
import {useStore} from "vuex";

export default defineComponent({
  name: 'LoginPage',
  setup () {
    const emailRegex = /^\S+@\S+\.\S+$/
    const router = useRouter()
    const store = useStore()
    const route = useRoute()
    const loading = ref(false)
    const emailRef = ref(null)
    const passwordRef = ref(null)

    const user = ref({
      email: undefined,
      password: undefined,
    })

    const notEmpty = val => !!val || t('common.requiredField')
    const validEmail = val => emailRegex.test(val) || t('common.invalidEmail')

    const isValid = () => {
      const fieldsIsValid = []
      fieldsIsValid.push(emailRef.value.validate())
      fieldsIsValid.push(passwordRef.value.validate())

      return fieldsIsValid.every(f => f === true)
    }

    const onClickSave = async () => {
      if (!isValid()) return
      try {
        loading.value = true
        await store.dispatch('user/login', user.value)
        await router.push({ name: 'users' })
        loading.value = false
      } catch (e) {
        console.error({e})
        loading.value = false
      }
    }

    return {
      router,
      route,
      user,
      loading,
      notEmpty,
      validEmail,
      onClickSave,
      emailRef,
      passwordRef,
    }
  },
})
</script>
