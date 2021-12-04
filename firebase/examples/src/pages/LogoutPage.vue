<script setup lang="ts">
import { useIdentityPasswordLogout, useAuthState } from 'auth-composables'

const { logout, loading } = useIdentityPasswordLogout()
const { isAuthenticated } = useAuthState()
</script>

<template>
  <!-- Sign Out Button -->
  <button v-if="!loading" :disabled="!isAuthenticated" @click="logout">Sign Out</button>

  <!-- Loading -->
  <div v-else>loading</div>

  <div v-if="isAuthenticated">Authenticated</div>
  <div v-else>UnAuthenticated</div>
</template>
