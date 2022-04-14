<script setup lang="ts">
import { useIdentityPasswordLogin, useAuthState, useIdentityPasswordLogout } from '@vueauth/core'

const {
  form,
  login,
  loading,
  hasErrors,
  errors,
  hasValidationErrors,
  validationErrors,
} = useIdentityPasswordLogin()

const {
  logout,
} = useIdentityPasswordLogout()

const authState = useAuthState()

const {
  isAuthenticated,
} = authState
</script>

<template>
  <form>
    <!-- Email -->
    <label for="email">Email</label>
    <input
      id="email"
      v-model="form.email"
      type="email"
      data-cy="email-input"
    >

    <br>

    <!-- Password -->
    <label for="password">Password</label>
    <input
      id="password"
      v-model="form.password"
      type="password"
      data-cy="password-input"
    >

    <br>

    <!-- Login -->
    <button
      v-if="!loading"
      :disabled="isAuthenticated"
      data-cy="login-button"
      @click.prevent="login"
    >
      Login
    </button>
    <div v-else>
      Login...
    </div>

    <br>

    <!-- Logout -->
    <button
      v-if="!loading"
      :disabled="!isAuthenticated"
      data-cy="logout-button"
      @click.prevent="logout"
    >
      Logout
    </button>

    <br>

    <!-- <div v-if="hasError" style="color: red;">{{ error.message }}</div> -->
  </form>
  <div>
    <h2>Auth State</h2>
    <pre data-cy="auth-state">{{ authState }}</pre>
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
