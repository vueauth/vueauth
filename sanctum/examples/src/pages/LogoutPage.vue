<script setup lang="ts">
import { useIdentityPasswordLogout, useAuthState } from 'auth-composables'

const { signOut, loading } = useIdentityPasswordLogout()
const { isAuthenticated } = useAuthState()
</script>

<template>
  <!-- Sign Out Button -->
  <button
    v-if="!loading"
    :disabled="!isAuthenticated"
    @click="signOut"
  >
    Sign Out
  </button>

  <!-- Loading -->
  <div v-else>
    loading
  </div>

  <div v-if="isAuthenticated">
    Authenticated
  </div>
  <div v-else>
    UnAuthenticated
  </div>
</template>
