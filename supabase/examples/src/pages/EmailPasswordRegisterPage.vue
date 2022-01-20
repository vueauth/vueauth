<script setup lang="ts">
import { useIdentityPasswordRegister, useAuthState } from '@vueauth/core'

const {
  form,
  loading,
  register,
  hasErrors,
  errors
} = useIdentityPasswordRegister()

const authState = useAuthState()
</script>

<template>
  <form @submit.prevent>
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

    <!-- Password -->
    <label for="password_confirmation">Password</label>
    <input
      id="password_confirmation"
      v-model="form.password_confirmation"
      type="password"
      data-cy="password-confirmation-input"
    >

    <br>

    <!-- Register Button -->
    <button
      v-if="!loading"
      data-cy="register-button"
      name="register-button"
      @click="register"
    >
      Register
    </button>
    <div v-else>
      Registering...
    </div>

    <br>

    <!-- Auth State -->
    <pre data-cy="auth-state">{{ authState }}</pre>
  </form>

  <div v-if="hasErrors">
    <h2>Errors</h2>
    <pre>{{ errors }}</pre>
  </div>
</template>
