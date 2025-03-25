<script setup>

</script>

<template>
  <q-page padding>
    <q-btn
      label="login page"
      class="q-ma-md"
      color="primary"
      :to="{ name: 'auth.login' }"
    />

    <q-btn
      label="register page"
      class="q-ma-md"
      color="secondary"
      :to="{ name: 'auth.register' }"
    />
  </q-page>
</template>
