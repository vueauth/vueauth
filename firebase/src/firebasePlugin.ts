import { App, Plugin } from 'vue'
import { initializeApp, FirebaseOptions } from 'firebase/app'
import { FirebaseAppKey } from './types/symbols'

export interface VuePluginOptions {
  credentials: FirebaseOptions
}

export const FirebasePlugin : Plugin<VuePluginOptions> = {
  install: (vueApp: App, options) => {
    const app = initializeApp(options.credentials)
    vueApp.provide(FirebaseAppKey, app)
  },
}

export default FirebasePlugin
