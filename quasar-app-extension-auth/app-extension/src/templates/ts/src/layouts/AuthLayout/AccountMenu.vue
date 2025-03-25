<script setup lang="ts">
import UpdatePasswordDialog from './UpdatePasswordDialog.vue'
import { useIdentityPasswordLogout } from '@vueauth/core'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showUpdatePasswordDialog = ref(false)

const { logout, loading } = useIdentityPasswordLogout()
async function onLogoutClicked() {
  await logout()
  await router.push('/login')
}
</script>

<template>
  <q-menu
    v-bind="$attrs"
    auto-close
  >
    <q-list>
      <q-item
        clickable
        @click="onLogoutClicked"
      >
        <q-item-section side>
          <q-icon
            v-if="!loading"
            name="logout"
          />
          <q-spinner
            v-else
            size="sm"
            color="primary"
          />
        </q-item-section>
        <q-item-section>
          Logout
        </q-item-section>
      </q-item>
      <q-item
        clickable
        @click="showUpdatePasswordDialog = true"
      >
        <q-item-section side>
          <q-icon name="key" />
        </q-item-section>
        <q-item-section>
          Change Password
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>

  <UpdatePasswordDialog v-model="showUpdatePasswordDialog" />
</template>
