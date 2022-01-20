<script setup lang="ts">
// Import composables
import {
  useIdentityPasswordLogin,
  useAuthState,
  useIdentityPasswordLogout,
  useFetchUser
} from '@vueauth/core'

// Email
const {
  form,
  login,
  loading: loggingIn,
  validationErrors,
  errors
} = useIdentityPasswordLogin()

// Logout
const {
  logout,
  loading: loggingOut
} = useIdentityPasswordLogout()

// Fetch user
const {
  loading: fetchingUser,
  fetch: fetchUser
} = useFetchUser()

fetchUser()

const authState = useAuthState()

form.value = {
  email: 'luke@ldiebold.com',
  password: 'asdfasdf'
}
</script>

<template>
  <form>
    <!-- Email -->
    <label for="email">Email</label>
    <input
      id="email"
      v-model="form.email"
      type="email"
    >
    <div v-if="validationErrors.email">
      <span
        v-for="validationError in validationErrors.email"
        :key="validationError"
      >{{ validationError }}</span>
    </div>

    <br>

    <!-- Password -->
    <label for="password">Password</label>
    <input
      id="password"
      v-model="form.password"
      type="password"
    >
    <div v-if="validationErrors.password">
      <span
        v-for="validationError in validationErrors.password"
        :key="validationError"
      >{{ validationError }}</span>
    </div>

    <br>

    <!-- Login Button -->
    <button
      :disabled="loggingIn || fetchingUser || authState.isAuthenticated.value"
      @click="login"
    >
      Sign In
    </button>

    <br>

    <!-- Fetch User -->
    <button
      v-if="!fetchingUser"
      @click="fetchUser"
    >
      Fetch User
    </button>
    <div v-else>
      Fetching User...
    </div>

    <br>

    <div style="margin-top: 20px;">
      Auth State
    </div>
    <pre>{{ authState }}</pre>

    <div>Validation Errors</div>
    <pre>{{ validationErrors }}</pre>

    <div>Errors</div>
    <pre>{{ errors }}</pre>

    <button
      v-if="!loggingOut"
      :disabled="!authState.isAuthenticated.value"
      @click="logout"
    >
      Logout
    </button>
    <span v-else>Logging out...</span>
  </form>
</template>
