import { App } from 'vue'
import { initializeApp, FirebaseOptions } from 'firebase/app'
import { FirebaseAppKey } from './types/symbols'

export interface VuePluginOptions {
  credentials: FirebaseOptions
}

export const FirebasePlugin = {
  install: (vueApp: App, options: VuePluginOptions) => {
    const app = initializeApp(options.credentials)
    vueApp.provide(FirebaseAppKey, app)
  },
}

export default FirebasePlugin
