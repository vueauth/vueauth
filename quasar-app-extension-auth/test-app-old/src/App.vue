<template>
  <router-view />
</template>

<script setup>
import { authenticateRoutes } from '@vueauth/quasar-app-extension-auth'
authenticateRoutes()
</script>
