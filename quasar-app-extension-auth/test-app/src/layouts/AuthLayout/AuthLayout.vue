<script setup lang="ts">
import { useAuthState } from '@vueauth/core'
import AccountMenu from './AccountMenu.vue'

import { ref } from 'vue'

const leftDrawerOpen = ref(false)

const authState = useAuthState()

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Dashboard
        </q-toolbar-title>

        <q-btn
          icon="person"
          :label="authState.user.value?.name ?? ''"
          rounded
          flat
        >
          <AccountMenu />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Menu
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
