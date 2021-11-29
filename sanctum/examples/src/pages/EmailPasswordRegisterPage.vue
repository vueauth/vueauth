<script setup lang="ts">
// Import composables
import {
  useIdentityPasswordRegister,
  useAuthState,
  useIdentityPasswordLogout
} from 'auth-composables'

import { useFetchUser } from 'sanctum-composables'

// Email
const {
  form,
  register,
  loading: loggingIn,
  validationErrors,
  errors
} = useIdentityPasswordRegister()

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
  name: 'John Poe',
  email: 'john@example.com',
  password: 'asdfasdf',
  password_confirmation: 'asdfasdf'
}
</script>

<template>
  <form>
    <!-- Name -->
    <label for="name">Name</label>
    <input id="name" v-model="form.name" type="name" />
    <div v-if="validationErrors.name">
      <span v-for="validationError in validationErrors.name">{{ validationError }}</span>
    </div>

    <br />

    <!-- Email -->
    <label for="email">Email</label>
    <input id="email" v-model="form.email" type="email" />
    <div v-if="validationErrors.email">
      <span v-for="validationError in validationErrors.email">{{ validationError }}</span>
    </div>

    <br />

    <!-- Password -->
    <label for="password">Password</label>
    <input id="password" v-model="form.password" type="password" />
    <div v-if="validationErrors.password">
      <span v-for="validationError in validationErrors.password">{{ validationError }}</span>
    </div>

    <br />

    <!-- Password Confirmation -->
    <label for="password_confirmation">Password Confirm</label>
    <input id="password_confirmation" v-model="form.password_confirmation" type="password" />
    <div v-if="validationErrors.password_confirmation">
      <span v-for="validationError in validationErrors.password_confirmation">{{ validationError }}</span>
    </div>

    <br />

    <!-- Register Button -->
    <button
      :disabled="loggingIn || fetchingUser || authState.isAuthenticated.value"
      @click="register"
    >Register</button>

    <br />

    <!-- Fetch User -->
    <button v-if="!fetchingUser" @click="fetchUser">Fetch User</button>
    <div v-else>Fetching User...</div>

    <br />

    <div style="margin-top: 20px;">Auth State</div>
    <pre>{{ authState }}</pre>

    <div>Validation Errors</div>
    <pre>{{ validationErrors }}</pre>

    <div>Errors</div>
    <pre>{{ errors }}</pre>

    <button :disabled="!authState.isAuthenticated.value" v-if="!loggingOut" @click="logout">Logout</button>
    <span v-else>Logging out...</span>
  </form>
</template>
