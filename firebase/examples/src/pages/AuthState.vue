<script setup lang="ts">
import { useAuthState } from 'firebase-composables'

const authState = useAuthState()
</script>

<template>
  <pre>{{ authState }}</pre>
</template>
