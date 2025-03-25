<script setup lang="ts">
import { QCard, QCardSection, QBtn } from 'quasar'
import ErrorBanners from 'components/auth/ErrorBanners.vue'
import PasswordResetRequestForm from 'components/auth/PasswordResetRequestForm.vue'
import { ref } from 'vue'
import { usePasswordReset } from 'src/composables/auth/usePasswordReset'

const {
  requestReset,
  requestForm,
  loading,
  hasValidationErrors,
  validationErrors,
  errors,
  hasErrors,
  resetErrors,
} = usePasswordReset()

const hasRequestedReset = ref(false)

async function handleRequestReset() {
  await requestReset()
  if (!hasErrors.value) {
    hasRequestedReset.value = true
  }
}

</script>

<template>
  <q-card>
    <q-card-section class="text-center q-pb-sm">
      <!-- Register Form -->
      <PasswordResetRequestForm
        v-if="!hasRequestedReset"
        id="request-password-reset-form"
        v-model:email="requestForm.email"
        :validation-errors="validationErrors"
        @submit.stop="handleRequestReset()"
        @update:model-value="resetErrors"
      />

      <div
        v-else
        style="font-size: 1.25em; max-width: 300px;"
      >
        We've emailed you instructions on how to reset your password 😊
      </div>

      <!-- Errors -->
      <div v-if="!hasValidationErrors">
        <ErrorBanners :errors="errors" />
      </div>
    </q-card-section>

    <!-- Request Password Reset Button -->
    <q-btn
      v-if="!hasRequestedReset"
      form="request-password-reset-form"
      type="submit"
      :loading="loading"
      class="full-width"
      color="grey-8"
      label="Email Reset Instructions"
      unelevated
      @click="handleRequestReset"
    />
  </q-card>
</template>
