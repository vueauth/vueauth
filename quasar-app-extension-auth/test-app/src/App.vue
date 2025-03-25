<script setup lang="ts">
import { authenticateRoutes } from '@vueauth/quasar-app-extension-auth'
authenticateRoutes()
</script>

<template>
  <router-view />
</template>
