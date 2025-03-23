<script setup>
import { useAuthState, useFetchUser, useUpdatePassword } from '@vueauth/core'

const {
  form,
  update,
  loading,
  validationErrors
} = useUpdatePassword()

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

    <label>Current Password</label><br>
    <input
      v-model="form.current_password"
      type="password"
    ><br>

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

  <pre>{{ validationErrors }}</pre>
</template>
