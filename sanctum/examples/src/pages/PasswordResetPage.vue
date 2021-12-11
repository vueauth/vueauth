<script setup>
import { usePasswordResetViaEmail } from 'auth-composables'

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

const urlSearchParams = new URLSearchParams(window.location.search)
const params = Object.fromEntries(urlSearchParams.entries())

if (params.email) {
  resetForm.value.email = params.email
}

requestForm.value.email = 'luke@ldiebold.com'
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
    <h1>Reset</h1>

    <label>Email</label><br>
    <input v-model="resetForm.email"><br>

    <label>New Password</label><br>
    <input v-model="resetForm.password"><br>

    <label>Confirm New Password</label><br>
    <input v-model="resetForm.password_confirmation"><br>

    <button
      :disabled="loading"
      @click="reset"
    >
      Request Reset Password Link
    </button>
  </div>
</template>
