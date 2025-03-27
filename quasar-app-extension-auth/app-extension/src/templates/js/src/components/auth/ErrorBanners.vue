<script setup lang="js">
import { toRef } from 'vue'

const props = defineProps({
  errors: {
    required: true,
    type: Array
  },
  class: {
    required: false,
    type: [Object, Array, String],
    default: 'bg-negative q-mt-sm text-white'
  },
  rounded: {
    required: false,
    type: Boolean,
    default: true
  }
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
