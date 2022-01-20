<script setup lang="ts">
import exampleRoutes from '../router/example-routes'
</script>

<template>
  <div>
    <ul>
      <li
        v-for="route in exampleRoutes"
        :key="route.label"
        style="list-style-type: none;"
      >
        <router-link
          :data-cy="`link-${route.name}`"
          :to="route.path"
        >
          {{ route.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
