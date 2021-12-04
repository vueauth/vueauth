<script setup lang="ts">
import { useAuthState } from 'auth-composables'

const authState = useAuthState()
</script>

<template>
  <pre>{{ authState }}</pre>
</template>
