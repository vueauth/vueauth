<script setup lang="js">
import { ref, watch } from 'vue'

import AuthUpdatePasswordForm from 'components/auth/UpdatePasswordForm.vue'
import AuthReauthenticateDialog from './ReauthenticateDialog.vue'
import ErrorBanners from 'components/auth/ErrorBanners.vue'

import { useAuthState } from '@vueauth/core'
import { useChangePassword } from 'src/composables/auth/useChangePassword'

const dialogComponent = ref()

const {
  form,
  loading,
  requiresReauthentication,
  errors,
  hasErrors,
  update: updatePassword,
  validationErrors,
  hasValidationErrors,
  resetErrors,
  resetForm,
} = useChangePassword()

async function handleUpdatePassword() {
  resetErrors()
  await updatePassword()
  if (!hasErrors.value) {
    dialogComponent.value.hide()
  }
}

const { user } = useAuthState()

if (typeof form.value.email === 'string' && user.value?.email) {
  form.value.email = user.value.email
}

const showReauthenticateDialog = ref(false)

if (requiresReauthentication !== undefined) {
  watch(requiresReauthentication, (newValue) => {
    if (newValue) {
      showReauthenticateDialog.value = true
    }
  })
}
</script>

<template>
  <q-dialog
    ref="dialogComponent"
    v-bind="$attrs"
    @hide="resetForm"
  >
    <q-card>
      <q-toolbar>
        <q-toolbar-title>Change Password</q-toolbar-title>
        <q-btn
          v-close-popup
          icon="close"
          round
          flat
        />
      </q-toolbar>

      <q-card-section>
        <AuthUpdatePasswordForm
          id="update-password-form"
          v-model:email="form.email"
          v-model:current-password="form.current_password"
          v-model:password="form.password"
          v-model:password-confirmation="form.password_confirmation"
          :validation-errors="validationErrors"
          @submit.stop="handleUpdatePassword()"
        />

        <!-- Errors -->
        <div v-if="!hasValidationErrors">
          <ErrorBanners :errors="errors" />
        </div>
      </q-card-section>

      <q-btn
        form="update-password-form"
        type="submit"
        label="update"
        :loading="loading"
        class="full-width"
        color="primary"
        @contextmenu.prevent="showReauthenticateDialog = true"
      />

      <AuthReauthenticateDialog
        v-if="requiresReauthentication !== undefined"
        v-model="showReauthenticateDialog"
      />
    </q-card>
  </q-dialog>
</template>
