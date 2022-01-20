<script setup lang="ts">
import { useUnauthenticatedRedirector } from '@vueauth/core'

const {
  onChecked,
  checking,
  exec,
  execOnAuthStateEnsured
} = useUnauthenticatedRedirector()
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
  <div>If unauthenticated, this page will redirect to home...</div>
</template>
