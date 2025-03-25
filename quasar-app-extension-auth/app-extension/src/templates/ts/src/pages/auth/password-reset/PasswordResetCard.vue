<script setup lang="ts">
import { QCard, QCardSection, QBtn } from 'quasar'
import ErrorBanners from 'components/auth/ErrorBanners.vue'
import { usePasswordReset } from 'src/composables/auth/usePasswordReset'
import { useRouter } from 'vue-router'
import PasswordResetForm from 'components/auth/PasswordResetForm.vue'

const router = useRouter()

const {
  reset,
  resetPasswordForm,
  loading,
  hasValidationErrors,
  validationErrors,
  errors,
  resetErrors,
  hasErrors,
} = usePasswordReset()

async function handlePasswordReset() {
  await reset()
  if (!hasErrors.value) {
    await router.push({ name: 'dashboard' })
  }
}
</script>

<template>
  <q-card>
    <q-card-section class="text-center q-pb-sm">
      <!-- Password Reset Form -->
      <PasswordResetForm
        id="password-reset-form"
        v-model:email="resetPasswordForm.email"
        v-model:password="resetPasswordForm.password"
        v-model:password-confirmation="resetPasswordForm.password_confirmation"
        :validation-errors="validationErrors"
        @submit.stop="handlePasswordReset()"
        @update:model-value="resetErrors"
      />

      <!-- Errors -->
      <div v-if="!hasValidationErrors">
        <ErrorBanners :errors="errors" />
      </div>
    </q-card-section>

    <!-- Change Password Button -->
    <q-btn
      form="password-reset-form"
      type="submit"
      :loading="loading"
      class="full-width"
      color="grey-8"
      label="Change Password"
      unelevated
    />
  </q-card>
</template>
