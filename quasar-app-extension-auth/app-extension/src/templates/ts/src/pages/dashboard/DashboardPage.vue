<script lang="ts" setup>
import { useAuthState } from '@vueauth/core'

const authStore = useAuthState()
</script>

<template>
  <q-page>
    <pre>{{ authStore }}</pre>
  </q-page>
</template>
