<script setup>
import { usePasswordResetViaEmail } from '@vueauth/core'

const {
  requestForm,
  resetPasswordForm,
  requestReset,
  reset,
  loading
} = usePasswordResetViaEmail()

const urlSearchParams = new URLSearchParams(window.location.search)
const params = Object.fromEntries(urlSearchParams.entries())

if (params.email) {
  resetPasswordForm.value.email = params.email
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
    <input v-model="resetPasswordForm.email"><br>

    <label>New Password</label><br>
    <input v-model="resetPasswordForm.password"><br>

    <label>Confirm New Password</label><br>
    <input v-model="resetPasswordForm.password_confirmation"><br>

    <button
      :disabled="loading"
      @click="reset"
    >
      Reset Password
    </button>
  </div>
</template>
