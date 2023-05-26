<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/user-store'
import { useQuasar } from 'quasar'

const router = useRouter()
const userStore = useUserStore()
const $q = useQuasar()
const _iconDarkMode = computed(() => $q.dark.isActive ? 'light_mode' : 'dark_mode')
const showLogout = ref(false)

function _logout () {
  userStore.$reset()
  showLogout.value = false
  router.replace({ name: 'login' })
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          House Rules App
        </q-toolbar-title>

        <div>
          <q-btn flat round color="primary" text-color="white" :icon="_iconDarkMode" @click="$q.dark.toggle()" />
          <q-btn flat round color="primary" text-color="white" icon="logout" @click="showLogout = true"
            v-if="userStore.isAuthenticated" />
          <q-dialog v-model="showLogout" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <span class="q-ml-sm">Do you want to logout the application?</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat label="Logout" color="primary" @click="_logout" />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
