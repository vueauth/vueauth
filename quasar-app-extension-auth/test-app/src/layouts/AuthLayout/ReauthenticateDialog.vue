<script setup lang="ts">
import AuthLoginForm from 'components/auth/LoginForm.vue'
import ErrorBanners from 'components/auth/ErrorBanners.vue'
import { ref } from 'vue'
import { useLogin } from 'src/composables/auth/useLogin'

const {
  isReauthenticating,
  form,
  validationErrors,
  login,
  hasErrors,
  errors,
  loading,
  resetForm,
  attemptSetEmailOnForm,
} = useLogin()

if (isReauthenticating) {
  isReauthenticating.value = true
}

const dialogComponent = ref()
attemptSetEmailOnForm()

async function handleLogin() {
  await login()
  if (!hasErrors.value) {
    dialogComponent.value.hide()
  }
}
</script>

<template>
  <q-dialog
    ref="dialogComponent"
    @hide="resetForm"
    @show="attemptSetEmailOnForm"
  >
    <q-card
      style="max-width: 300px;"
      class="full-width"
    >
      <q-toolbar>
        <q-toolbar-title>Confirm Identity</q-toolbar-title>
        <q-btn
          icon="question_mark"
          color="primary"
          size="sm"
          round
          flat
        >
          <q-tooltip
            class="bg-primary"
            max-width="300px"
            style="font-size: 1.2em;"
            anchor="bottom right"
            self="top right"
          >
            When making sensitive changes to your account, we ask you to login again if it's been a while.
          </q-tooltip>
        </q-btn>
      </q-toolbar>
      <q-card-section>
        <AuthLoginForm
          v-model:email="form.email"
          v-model:password="form.password"
          :validation-errors="validationErrors"
        />
        <ErrorBanners
          v-if="hasErrors"
          :errors="errors"
        />
      </q-card-section>
      <q-btn
        class="full-width"
        label="Login"
        color="primary"
        :loading="loading"
        @click="handleLogin"
      />
    </q-card>
  </q-dialog>
</template>
