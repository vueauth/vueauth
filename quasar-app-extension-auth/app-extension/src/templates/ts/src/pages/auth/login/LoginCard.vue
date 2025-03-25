<script setup lang="ts">
import { QCard, QCardSection, QBtn } from 'quasar'
import LoginForm from 'components/auth/LoginForm.vue'
import { useLogin } from 'src/composables/auth/useLogin'
import ErrorBanners from 'components/auth/ErrorBanners.vue'

const {
  handleLogin,
  form,
  loading,
  errors,
  validationErrors,
  hasValidationErrors,
} = useLogin()
</script>

<template>
  <q-card>
    <q-card-section class="text-center">
      <!-- Login Form -->
      <LoginForm
        id="login-form"
        v-model:email="form.email"
        v-model:password="form.password"
        :validation-errors="validationErrors"
        @submit.stop="handleLogin()"
      />

      <!-- Errors -->
      <div v-if="!hasValidationErrors">
        <ErrorBanners :errors="errors" />
      </div>
    </q-card-section>

    <!-- Login Button -->
    <q-btn
      :loading="loading"
      class="full-width"
      color="primary"
      label="login"
      unelevated
      form="login-form"
      type="submit"
    />
  </q-card>
</template>
