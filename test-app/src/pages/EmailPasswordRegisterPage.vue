<script setup lang="ts">
import { useIdentityPasswordRegister, useAuthState } from '@vueauth/core'
import { computed } from 'vue'

const {
  form,
  loading,
  register,
  hasErrors,
  errors,
  hasValidationErrors,
  validationErrors,
} = useIdentityPasswordRegister()

const authState = useAuthState()

const hasName = computed(() => typeof form.value.name === 'string')
const hasUsername = computed(() => typeof form.value.username === 'string')
</script>

<template>
  <form @submit.prevent>
    <!-- Name -->
    <label
      v-if="hasName"
      for="name"
    >Name</label>
    <input
      v-if="hasName"
      id="name"
      v-model="form.name"
      type="name"
      data-cy="name-input"
    >

    <br>

    <!-- Username -->
    <label
      v-if="hasUsername"
      for="username"
    >Username</label>
    <input
      v-if="hasUsername"
      id="username"
      v-model="form.username"
      type="username"
      data-cy="username-input"
    >

    <br>

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

  <br>

  <!-- Validation Errors -->
  <div v-if="hasValidationErrors">
    <h2>Validation Errors</h2>
    <pre>{{ validationErrors }}</pre>
  </div>
</template>
