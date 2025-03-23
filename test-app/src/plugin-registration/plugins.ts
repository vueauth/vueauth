import { App } from 'vue'

import * as supabasePlugin from './supabase'
import * as firebasePlugin from './firebase'
import * as sanctumPlugin from './sanctum'
import * as strapiPlugin from './strapi'
import * as indexedDbPlugin from './indexeddb'

const plugins = [
  {
    key: 'supabase',
    registerFunction: supabasePlugin.registerFunction,
    vueAuthConfig: supabasePlugin.vueAuthConfig,
  },
  {
    key: 'firebase',
    registerFunction: firebasePlugin.registerFunction,
    vueAuthConfig: firebasePlugin.vueAuthConfig,
  },
  {
    key: 'sanctum',
    registerFunction: sanctumPlugin.registerFunction,
    vueAuthConfig: sanctumPlugin.vueAuthConfig,
  },
  {
    key: 'strapi',
    registerFunction: strapiPlugin.registerFunction,
    vueAuthConfig: strapiPlugin.vueAuthConfig,
  },
  {
    key: 'indexeddb',
    registerFunction: indexedDbPlugin.registerFunction,
    vueAuthConfig: indexedDbPlugin.vueAuthConfig,
  },
]

/**
 * Register all available auth provider plugins
 */
function registerPlugins (app: App) {
  plugins.forEach(plugin => plugin.registerFunction(app))
}

/**
 * Get auth provider configs. Mostly used
 * for mapping implementations
 */
function getAuthPluginProvidersConfig () {
  const result = {}
  plugins.forEach(plugin => {
    result[plugin.key] = plugin.vueAuthConfig
  })
  return result
}

export {
  registerPlugins,
  getAuthPluginProvidersConfig,
}
