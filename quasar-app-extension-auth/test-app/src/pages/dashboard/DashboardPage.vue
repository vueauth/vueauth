<script lang="ts" setup>
import { useModel } from '@vuemodel/core'
import Todo from 'src/models/Todo'
import { mdiPlus } from '@quasar/extras/mdi-v7'
import { useAuthState } from '@vueauth/core'
import { reactive } from 'vue'

const authState = useAuthState()
const todosService = reactive(useModel(Todo, {
  update: {
    immediatelyMakeForms: true,
    autoUpdate: true,
    autoUpdateDebounce: 100,
  },
}))
</script>

<template>
  <q-page padding>
    <q-page-sticky
      :offset="[12,12]"
      position="bottom-right"
    >
      <q-btn
        fab
        color="accent"
        :icon="mdiPlus"
        @click="todosService.creator.create({ user_id: authState.user?.value?.id })"
      />
    </q-page-sticky>

    <q-list>
      <q-item
        v-for="({ id, form }) in todosService.updater.forms"
        :key="id"
      >
        <q-item-section>
          <q-input
            v-model="form.title"
            filled
          />
        </q-item-section>

        <q-item-section side>
          <q-checkbox v-model="form.completed" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>
