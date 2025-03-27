<script setup lang="js">
import { QInput, QForm } from 'quasar'

const email = defineModel('email', { required: true, type: String })
const password = defineModel('password', { required: true, type: String })
const passwordConfirmation = defineModel('passwordConfirmation', { required: true, type: String })

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
      v-model="email"
      filled
      label="Email"
      :error="!!validationErrors?.['email']"
      :error-message="validationErrors?.['email']?.[0]"
      class="q-mb-md"
      hide-bottom-space
    />

    <q-input
      v-model="password"
      filled
      label="Password"
      :error="!!validationErrors?.['password']"
      :error-message="validationErrors?.['password']?.[0]"
      class="q-mb-xs"
      type="password"
      hide-bottom-space
    />

    <q-input
      v-model="passwordConfirmation"
      filled
      label="Confirm Password"
      :error="!!validationErrors?.['password_confirmation']"
      :error-message="validationErrors?.['password_confirmation']?.[0]"
      class="q-mb-md"
      type="password"
      hide-bottom-space
    />

    <slot name="bottom" />
  </q-form>
</template>
