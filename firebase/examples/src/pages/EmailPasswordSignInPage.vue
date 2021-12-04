<script setup lang="ts">
import { useIdentityPasswordLogin, useAuthState } from 'auth-composables'

const {
  form,
  login,
  loading
} = useIdentityPasswordLogin()

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
    <button v-if="!loading" :disabled="isAuthenticated" @click="login">Sign In</button>
    <div v-else>Signing In...</div>

    <br />

    <!-- <div v-if="hasError" style="color: red;">{{ error.message }}</div> -->

    <pre>{{ authState }}</pre>
  </form>
</template>
