<script setup lang="ts">
import { usePasswordResetViaEmail } from '@vueauth/core'

const {
  requestForm,
  resetForm,
  requestReset,
  reset,
  loading,
  validationErrors,
  hasValidationErrors,
  hasErrors,
  errors,
  resetStandardErrors,
  resetValidationErrors,
  resetErrors
} = usePasswordResetViaEmail()
</script>

<template>
  <div>
    <h2>Request Reset</h2>

    <div>Email</div>
    <input v-model="requestForm.email">

    <br>

    <button
      :disabled="loading"
      @click="requestReset"
    >
      Request Reset Password Link
    </button>
  </div>

  <div>
    <h2>Reset</h2>

    <div>Email</div>
    <input v-model="resetForm.email">

    <br>

    <div>New Password</div>
    <input v-model="resetForm.password">

    <br>

    <div>Confirm New Password</div>
    <input v-model="resetForm.password_confirmation">

    <br>

    <button
      :disabled="loading"
      @click="reset"
    >
      Request Reset Password Link
    </button>
  </div>
</template>
