<script setup lang="ts">
import { type ValidationErrors } from '@vueauth/core'
import { QInput, QForm } from 'quasar'

const email = defineModel<string>('email', { required: true })

withDefaults(defineProps<{
  validationErrors?: ValidationErrors
}>(), {
  validationErrors: () => ({}),
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

    <slot name="bottom" />
  </q-form>
</template>
