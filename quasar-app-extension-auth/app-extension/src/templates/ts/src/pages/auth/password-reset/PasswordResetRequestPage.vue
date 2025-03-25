<script setup lang="ts">
import PasswordResetRequestCard from './PasswordResetRequestCard.vue'

</script>

<template>
  <div
    class="flex flex-center"
    style="min-height: 100vh"
    padding
  >
    <div class="text-center">
      <h5 class="q-mb-md">
        Password Reset
      </h5>
      <PasswordResetRequestCard />
      <q-btn
        class="full-width q-mt-md"
        color="grey-6"
        label="back"
        flat
        :to="{ name: 'auth.login' }"
      />
    </div>
  </div>
</template>
