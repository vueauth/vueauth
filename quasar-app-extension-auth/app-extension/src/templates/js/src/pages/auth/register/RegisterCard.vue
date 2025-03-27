<script setup lang="js">
import { QCard, QCardSection, QBtn } from 'quasar'
import ErrorBanners from 'components/auth/ErrorBanners.vue'
import RegisterForm from 'components/auth/RegisterForm.vue'
import { useRegister } from 'src/composables/auth/useRegister'

const {
  form,
  loading,
  errors,
  handleRegister,
  validationErrors,
  hasValidationErrors,
  registered,
} = useRegister()
</script>

<template>
  <q-card>
    <q-card-section class="text-center">
      <!-- Register Form -->
      <RegisterForm
        id="register-account-form"
        v-model:email="form.email"
        v-model:password="form.password"
        v-model:password-confirmation="form.password_confirmation"
        v-model:name="form.name"
        v-model:username="form.username"
        :validation-errors="validationErrors"
        @submit.stop="handleRegister()"
      />

      <!-- Errors -->
      <div
        v-if="!hasValidationErrors"
        class="q-mb-sm"
      >
        <ErrorBanners :errors="errors" />
      </div>
    </q-card-section>

    <!-- Register Button -->
    <q-btn
      v-if="!registered"
      :loading="loading"
      class="full-width"
      color="primary"
      label="register"
      unelevated
      form="register-account-form"
      type="submit"
    />

    <q-dialog
      :model-value="registered"
      persistent
    >
      <q-card>
        <q-card-section>
          <h5 class="q-my-md">
            Account Created!
          </h5>
          <div class="q-my-md">
            Look for a confirmation email in your inbox to get started!
          </div>
        </q-card-section>
        <q-btn
          label="Login Page"
          color="primary"
          unelevated
          no-caps
          class="full-width"
          :to="{ name: 'auth.login' }"
        />
      </q-card>
    </q-dialog>
  </q-card>
</template>
