<script setup>
import { useAuthState, useFetchUser, useUpdatePassword } from 'auth-composables'

const {
  form,
  update,
  loading,
  errors,
  validationErrors,
  onRequiresReauthentication
} = useUpdatePassword()

onRequiresReauthentication.value = () => {
  console.log('handle reauthenticate')
}

const { loading: fetching, fetch: fetchUser } = useFetchUser()
fetchUser()

const { isAuthenticated } = useAuthState()
</script>

<template>
  <div v-if="fetching">
    Fetching signed in user...
  </div>

  <div v-else-if="!isAuthenticated">
    Not Authenticated
  </div>

  <div v-else>
    <h1>Update Password</h1>

    <label>New Password</label><br>
    <input
      v-model="form.password"
      type="password"
    ><br>

    <label>New Password Confirm</label><br>
    <input
      v-model="form.password_confirmation"
      type="password"
    ><br>

    <button
      :disabled="loading"
      @click="update"
    >
      Update Password
    </button>
  </div>

  <h2>Validation Errors</h2>
  <pre>{{ validationErrors }}</pre>

  <h2>Errors</h2>
  <pre>{{ errors }}</pre>
</template>
