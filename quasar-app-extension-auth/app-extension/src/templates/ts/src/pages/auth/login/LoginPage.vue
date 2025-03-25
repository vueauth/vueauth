<script setup lang="ts">
import AuthLoginCard from './LoginCard.vue'
</script>

<template>
  <div
    class="flex flex-center"
    style="min-height: 100vh"
    padding
  >
    <div class="text-center">
      <h5 class="q-mb-md">
        Sign In
      </h5>
      <AuthLoginCard />
      <q-btn
        class="full-width q-mt-md"
        color="grey-6"
        label="forgot password"
        flat
        :to="{ name: 'auth.requestPasswordReset' }"
      />
    </div>
  </div>
  <div
    class="absolute-top-right q-pa-md"
  >
    <div>Need an account?</div>
    <q-btn
      no-caps
      label="register"
      flat
      class="full-width"
      :to="{ name: 'auth.register' }"
    />
  </div>
</template>
