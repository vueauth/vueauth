<script setup lang="js">
import { QInput, QForm } from 'quasar'
import { getConfig } from '@vueauth/core'

const { withUsername } = getConfig('identityPassword:register')

const email = defineModel('email', { required: true, type: String })
const password = defineModel('password', { required: true, type: String })
const passwordConfirmation = defineModel('passwordConfirmation', { required: true, type: String })
const name = defineModel('name', { required: false, type: String, default: null })
const username = defineModel('username', { required: false, type: String, default: null })

defineProps({
  validationErrors: {
    required: false,
    type: Object,
    default () {
      return {}
    }
  }
})
</script>

<template>
  <q-form>
    <q-input
      v-if="typeof name === 'string'"
      v-model="name"
      filled
      label="Name"
      :error="!!validationErrors?.['name']"
      :error-message="validationErrors?.['name']?.[0]"
      class="q-mb-sm"
      hide-bottom-space
    />

    <q-input
      v-if="withUsername"
      v-model="username"
      filled
      label="Username"
      :error="!!validationErrors?.['username']"
      :error-message="validationErrors?.['username']?.[0]"
      class="q-mb-sm"
      hide-bottom-space
    />

    <q-input
      v-model="email"
      filled
      label="Email"
      :error="!!validationErrors?.['email']"
      :error-message="validationErrors?.['email']?.[0]"
      class="q-mb-sm"
      hide-bottom-space
    />

    <q-input
      v-model="password"
      filled
      type="password"
      label="Password"
      :error="!!validationErrors?.['password']"
      :error-message="validationErrors?.['password']?.[0]"
      class="q-mb-sm"
      hide-bottom-space
    />

    <q-input
      v-if="typeof passwordConfirmation === 'string'"
      v-model="passwordConfirmation"
      filled
      type="password"
      label="Confirm Password"
      :error="!!validationErrors?.['password_confirmation']"
      :error-message="validationErrors?.['password_confirmation']?.[0]"
      class="q-mb-sm"
      hide-bottom-space
    />
  </q-form>
</template>
