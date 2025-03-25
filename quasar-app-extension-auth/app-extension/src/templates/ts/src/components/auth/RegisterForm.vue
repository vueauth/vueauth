<script setup lang="ts">
import { QInput, QForm } from 'quasar'
import type { UseIdentityPasswordRegisterConfig, ValidationErrors } from '@vueauth/core'
import { getConfig } from '@vueauth/core'

const { withUsername } = getConfig<UseIdentityPasswordRegisterConfig>('identityPassword:register')

const email = defineModel<string>('email', { required: true })
const password = defineModel<string>('password', { required: true })
const passwordConfirmation = defineModel<string>('passwordConfirmation', { required: true })
const name = defineModel<string | undefined>('name', { required: false, default: null })
const username = defineModel<string | undefined>('username', { required: false, default: null })

withDefaults(defineProps<{
  validationErrors?: ValidationErrors
}>(), {
  validationErrors: () => ({}),
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
