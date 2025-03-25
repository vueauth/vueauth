<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-white text-grey-9"
      elevated
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>Quasar {{ authProviderUpperFirst }}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Your Menu
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { getDefaultProvider } from '@vueauth/core'

const leftDrawerOpen = ref(false)

const authProvider = getDefaultProvider()
const authProviderUpperFirst = authProvider.charAt(0).toUpperCase() + authProvider.slice(1)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
