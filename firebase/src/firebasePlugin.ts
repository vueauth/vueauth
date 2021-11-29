import { App } from 'vue-demi'
import { initializeApp, FirebaseOptions } from 'firebase/app'
import { FirebaseAppKey } from './types/symbols'

export interface VuePluginOptions {
  credentials: FirebaseOptions
}

export const firebasePlugin = {
  install: (vueApp: App, options: VuePluginOptions) => {
    const app = initializeApp(options.credentials)
    vueApp.provide(FirebaseAppKey, app)
  }
}

export default firebasePlugin