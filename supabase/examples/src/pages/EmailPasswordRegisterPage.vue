<script setup lang="ts">
import { useIdentityPasswordRegister, useAuthState } from 'auth-composables'

const {
  form,
  loading,
  register,
  hasErrors,
  errors
} = useIdentityPasswordRegister()

form.value = {
  email: 'crazybuzz100@gmail.com',
  password: 'asdfasdf',
  password_confirmation: 'asdfasdf'
}

const authState = useAuthState()
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

    <br>

    <!-- Password -->
    <label for="password">Password</label>
    <input
      id="password"
      v-model="form.password"
      type="password"
    >

    <br>

    <!-- Password -->
    <label for="password_confirmation">Password</label>
    <input
      id="password_confirmation"
      v-model="form.password_confirmation"
      type="password"
    >

    <br>

    <!-- Register Button -->
    <button
      v-if="!loading"
      @click="register"
    >
      Register
    </button>
    <div v-else>
      Registering...
    </div>

    <br>

    <!-- <div v-if="hasError" style="color: red;">{{ error.message }}</div> -->

    <pre>{{ authState }}</pre>
  </form>

  <div v-if="hasErrors">
    <h2>Errors</h2>
    <pre>{{ errors }}</pre>
  </div>
</template>
