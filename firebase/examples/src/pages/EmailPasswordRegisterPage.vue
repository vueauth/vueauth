<script setup lang="ts">
import { useIdentityPasswordRegister, useAuthState } from '@vueauth/core'

const {
  form,
  loading,
  register,
} = useIdentityPasswordRegister()

const authState = useAuthState()
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

    <!-- Register Button -->
    <button v-if="!loading" @click="register">Register</button>
    <div v-else>Registering...</div>

    <br />

    <!-- <div v-if="hasError" style="color: red;">{{ error.message }}</div> -->

    <pre>{{ authState }}</pre>
  </form>
</template>
