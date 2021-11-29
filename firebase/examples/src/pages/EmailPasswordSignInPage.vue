<script setup lang="ts">
import { useEmailSignIn, useAuthState } from 'firebase-composables'

const {
  form,
  signIn,
  loading,
  error,
  hasError
} = useEmailSignIn()

const authState = useAuthState()

const {
  isAuthenticated
} = authState
</script>

<template>
  <form>
    <!-- Email -->
    <label for="email">Email</label>
    <input id="email" v-model="form.email" type="email" />

    <br />

    <!-- Password -->
    <label for="password">Password</label>
    <input id="password" v-model="form.password" type="password" />

    <br />

    <!-- Sign In -->
    <button v-if="!loading" :disabled="isAuthenticated" @click="signIn">Sign In</button>
    <div v-else>Signing In...</div>

    <br />

    <div v-if="hasError" style="color: red;">{{ error.message }}</div>

    <pre>{{ authState }}</pre>
  </form>
</template>
