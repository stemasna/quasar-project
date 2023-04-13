<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card flat bordered style="border-radius: 0.5rem" class="q-pa-md">
        <div class="row justify-center">
          <div class="text-weight-bold text-h4">
            {{$t('common.login')}}
          </div>
        </div>
        <div class="row q-col-gutter-md q-mt-md">
          <q-input class="col-12 col-md-12" ref="emailRef" :rules="[notEmpty, validEmail]" v-model="user.email" :label="$t('common.email')" outlined dense/>
          <q-input :type="isPwd ? 'password' : 'text'" class="col-12 col-md-12" ref="passwordRef" :rules="[notEmpty]" @keyup.enter="onClickSave" v-model="user.password" :label="$t('common.password')" outlined dense>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
      </q-card>
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onClickSave" :loading="loading" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {useDialogPluginComponent, useQuasar} from 'quasar'
import {defineComponent, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {t} from "boot/i18n";
import {useStore} from "vuex";

export default defineComponent({
  name: 'LoginModal',
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup () {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const $q = useQuasar()
    const emailRegex = /^\S+@\S+\.\S+$/
    const router = useRouter()
    const store = useStore()
    const route = useRoute()
    const loading = ref(false)
    const emailRef = ref(null)
    const isPwd = ref(true)
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
        await store.dispatch('login', user.value)
        $q.notify({
          message: t('common.welcome')
        })
        onDialogOK()
        loading.value = false
      } catch (e) {
        console.error({e})
        loading.value = false
      }
    }

    return {
      dialogRef,
      onDialogHide,
      onCancelClick: onDialogCancel,
      router,
      route,
      user,
      loading,
      notEmpty,
      validEmail,
      onClickSave,
      emailRef,
      passwordRef,
      isPwd
    }
  },
})
</script>

<style scoped lang="scss">

</style>
