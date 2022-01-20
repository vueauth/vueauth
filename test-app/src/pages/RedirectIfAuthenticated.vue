<script setup lang="ts">
import { useAuthenticatedRedirector, useAuthState } from '@vueauth/core'

const {
  onChecked,
  checking,
  exec,
  execOnAuthStateEnsured
} = useAuthenticatedRedirector()

const authState = useAuthState()

execOnAuthStateEnsured()

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

  <div>If authenticated, this page will redirect to home...</div>

  <h2>Auth State</h2>
  <pre>{{ authState }}</pre>
</template>
