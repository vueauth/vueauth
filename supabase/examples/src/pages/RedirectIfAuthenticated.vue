<script setup lang="ts">
import { useAuthenticatedRedirector } from 'auth-composables'

const {
  onChecked,
  checking,
  exec,
  execOnAuthStateEnsured
} = useAuthenticatedRedirector()
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
</template>
