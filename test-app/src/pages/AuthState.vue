<script setup lang="ts">
import { useAuthState } from '@vueauth/core'

const authState = useAuthState()
</script>

<template>
  <pre data-cy="auth-state">{{ authState }}</pre>
</template>
