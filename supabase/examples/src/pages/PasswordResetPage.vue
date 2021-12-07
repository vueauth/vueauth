<script setup lang="ts">
import { usePasswordResetViaEmail } from 'auth-composables'
import { useClient } from 'supabase-composables'

const client = useClient()

const {
  requestForm,
  resetForm,
  requestReset,
  reset,
  loading,
  hasErrors,
  errors
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

  <div v-if="hasErrors">
    <h2>Errors</h2>
    <pre>{{ errors }}</pre>
  </div>
</template>
