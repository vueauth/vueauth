import { createApp } from 'vue'
import { createGlobalState, useStorage } from '@vueuse/core'

import { AuthPlugin, PluginOptions } from '@vueauth/core'
import App from './App.vue'
import router from './router/router'
import { getAuthPluginProvidersConfig, registerPlugins } from './plugin-registration/plugins'

const app = createApp(App)

app.use(router)

const defaultProviderState = createGlobalState(
  () => useStorage('defaultProvider', 'supabase'),
)

const defaultProvider = defaultProviderState()

registerPlugins(app)

app.use(AuthPlugin, {
  default: defaultProvider,
  providers: getAuthPluginProvidersConfig(),
} as PluginOptions)

app.mount('#app')

export {
  defaultProviderState,
}
