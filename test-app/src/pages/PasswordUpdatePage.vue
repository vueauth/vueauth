<script setup lang="ts">
import { useUpdatePassword } from '@vueauth/core'

const {
  form,
  update,
  hasErrors,
  errors,
  hasValidationErrors,
  validationErrors,
} = useUpdatePassword()

form.value.password = 'onetwothree'
form.value.password_confirmation = 'onetwothree'
</script>

<template>
  <div>
    <h2>Update</h2>

    <div>Current Password</div>
    <input v-model="form.current_password">

    <br>

    <div>New Password</div>
    <input v-model="form.password">

    <br>

    <div>Confirm New Password</div>
    <input v-model="form.password_confirmation">

    <br>

    <button @click="update">
      update
    </button>
  </div>

  <div v-if="hasErrors">
    <h2>Errors</h2>
    <pre>{{ errors }}</pre>
  </div>

  <div v-if="hasValidationErrors">
    <h2>Validation Errors</h2>
    <pre>{{ validationErrors }}</pre>
  </div>
</template>
