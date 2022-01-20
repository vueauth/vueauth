<script setup lang="ts">
import { getConfig } from '@vueauth/core'
import exampleRoutes from '../router/example-routes'

const config = getConfig()
</script>

<template>
  <div>
    <ul>
      <li
        v-for="route in exampleRoutes"
        :key="route.label"
        style="list-style-type: none;"
      >
        <router-link :to="route.path">
          {{ route.label }}
        </router-link>
      </li>
    </ul>
  </div>

  <div>
    <h3>Config</h3>
    <pre>{{ config }}</pre>
  </div>
</template>
