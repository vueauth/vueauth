<script setup lang="ts">
import { getOptions } from 'auth-composables'
import exampleRoutes from '../router/example-routes'

console.log(getOptions('', 'identityPassword:register'))
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
</template>
