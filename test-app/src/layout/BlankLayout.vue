<script lang="ts" setup>
import providers from '../../availableProviders'
import { defaultProviderState } from '../main'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const defaultProvider = defaultProviderState()
const route = useRoute()

watch(defaultProvider, () => {
  if (route.name !== 'home') {
    location.reload()
  }
})
</script>

<template>
  <div style="padding: 30px; position: relative;">
    <router-link
      style="position: absolute; top: 8px; left: 8px;"
      to="/"
      data-cy="home-link"
    >
      Home
    </router-link>

    <div
      style="position: absolute; top: 8px; right: 8px;"
    >
      <label>Provider: </label>
      <select
        v-model="defaultProvider"
        data-cy="default-provider-select"
      >
        <option
          v-for="provider in Object.keys(providers)"
          :key="provider"
          :data-cy="'default-provider-select-' + provider"
        >
          {{ provider }}
        </option>
      </select>
    </div>

    <router-view />
  </div>
</template>
