<script setup lang="js">
import { QInput, QForm } from 'quasar'

const email = defineModel<string | undefined>('email', { required: false, type: String, default: null })
const currentPassword = defineModel<string | undefined>('currentPassword', { required: false, type: String, default: null })
const password = defineModel<string>('password', { required: true, type: String })
const passwordConfirmation = defineModel<string>('passwordConfirmation', { required: false, type: String, default: null })

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
    <slot name="top" />

    <q-input
      v-if="typeof email === 'string'"
      v-model="email"
      filled
      label="Email"
      :error="!!validationErrors?.['email']"
      :error-message="validationErrors?.['email']?.[0]"
      class="q-mb-md"
      hide-bottom-space
    />

    <q-input
      v-if="typeof currentPassword === 'string'"
      v-model="currentPassword"
      filled
      type="password"
      label="Current Password"
      :error="!!validationErrors?.['current_password']"
      :error-message="validationErrors?.['current_password']?.[0]"
      class="q-mb-lg"
      hide-bottom-space
    />

    <q-input
      v-if="typeof password === 'string'"
      v-model="password"
      filled
      type="password"
      label="New Password"
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
      label="Confirm New Password"
      :error="!!validationErrors?.['password_confirmation']"
      :error-message="validationErrors?.['password_confirmation']?.[0]"
      class="q-mb-sm"
      hide-bottom-space
    />

    <slot name="bottom" />
  </q-form>
</template>
