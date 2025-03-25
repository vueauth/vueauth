<script setup lang="ts">
import { toRef } from 'vue'
import { type StandardError } from '@vueauth/core'

const props = withDefaults(defineProps<{
  errors: StandardError[]
  class?: object | string[] | string
  rounded?: boolean
}>(), {
  class: 'bg-negative q-mt-sm text-white',
  rounded: true,
})

const classProps = toRef(props, 'class')
</script>

<template>
  <q-banner
    v-for="error in errors"
    :key="error.message"
    :rounded="rounded"
    :class="classProps"
  >
    {{ error.message }}
  </q-banner>
</template>
