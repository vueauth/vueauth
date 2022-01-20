<script setup lang="ts">
import { useUnauthenticatedRedirector, useAuthState } from '@vueauth/core'

const {
  onChecked,
  checking,
  exec,
  execOnAuthStateEnsured
} = useUnauthenticatedRedirector()
execOnAuthStateEnsured()

const authState = useAuthState()

onChecked.value = () => {
  console.log('redirecting to home')
}
</script>

<template>
  <button
    v-if="!checking"
    @click="exec"
  >
    check
  </button>
  <span v-else>Checking...</span>

  <div>If unauthenticated, this page will redirect to home...</div>

  <h2>Auth State</h2>
  <pre>{{ authState }}</pre>
</template>
