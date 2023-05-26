<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/user-store'
import { notify } from 'src/helpers/notify'

const router = useRouter()
const userStore = useUserStore()
const name = ref<string>('')
const password = ref<string>('')
const showPassword = ref(false)
const _iconPassword = computed(() => showPassword.value ? 'visibility' : 'visibility_off')
const requiredRules = [(val: string) => val && val.length > 0 || 'Please type something']

function onSubmit () {
  userStore.login()
  notify('positive', 'Login succesful')
  router.replace({ name: 'home' })
}
</script>

<template>
  <q-page padding>
    <q-card class="q-mx-auto" style="max-width: 400px">
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input filled v-model="name" label="User" lazy-rules :rules="requiredRules" />

          <q-input filled :type="showPassword ? 'text' : 'password'" v-model="password" label="Password" lazy-rules
            :rules="requiredRules">
            <template v-slot:append>
              <q-icon :name="_iconPassword" @click="showPassword = !showPassword" />
            </template>
          </q-input>

          <div>
            <q-btn label="Login" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
