<script setup lang="ts">
import { useAuthState } from '@vueauth/core'

const authState = useAuthState()
</script>

<template>
  <pre>{{ authState }}</pre>
</template>
