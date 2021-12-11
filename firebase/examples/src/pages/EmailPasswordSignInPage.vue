<script setup lang="ts">
import { useIdentityPasswordLogin, useAuthState } from 'auth-composables'

const {
  form,
  login,
  loading,
  isReauthenticating
} = useIdentityPasswordLogin()

const authState = useAuthState()

const {
  isAuthenticated
} = authState
</script>

<template>
  <label for="reauthenticating">Is Reauthenticating</label><br>
  <input
    id="reauthenticating"
    v-model="isReauthenticating"
    type="checkbox"
  >

  <form>
    <!-- Email -->
    <label for="email">Email</label><br>
    <input
      id="email"
      v-model="form.email"
      type="email"
    >

    <br>

    <!-- Password -->
    <label for="password">Password</label><br>
    <input
      id="password"
      v-model="form.password"
      type="password"
    >

    <br>

    <!-- Sign In -->
    <button
      v-if="!loading"
      :disabled="isAuthenticated && !isReauthenticating"
      @click="login"
    >
      Sign In
    </button>
    <div v-else>
      Signing In...
    </div>

    <br>

    <!-- <div v-if="hasError" style="color: red;">{{ error.message }}</div> -->

    <pre>{{ authState }}</pre>
  </form>
</template>
