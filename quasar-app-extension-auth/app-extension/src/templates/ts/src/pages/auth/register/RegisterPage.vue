<script setup lang="ts">
import RegisterCard from './RegisterCard.vue'

</script>

<template>
  <div
    class="flex flex-center"
    style="min-height: 100vh"
    padding
  >
    <div class="text-center">
      <h5 class="q-mb-md">
        Register
      </h5>
      <RegisterCard />
    </div>
  </div>
  <div
    class="absolute-top-right q-pa-md"
  >
    <div>Already have an account?</div>
    <q-btn
      no-caps
      label="login"
      flat
      class="full-width"
      :to="{ name: 'auth.login' }"
    />
  </div>
</template>
