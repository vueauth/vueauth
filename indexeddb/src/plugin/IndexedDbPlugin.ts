import { App, Plugin } from 'vue'
import { state } from './state'
import PluginOptions from '../types/PluginOptions'
import { IndexedDbAppKey } from '../types/symbols'
import { AuthDb } from 'src/db/AuthDb'

export const IndexedDbPlugin: Plugin<PluginOptions> = {
  install: (vueApp: App, options) => {
    vueApp.provide(IndexedDbAppKey, options)
    state.db = new AuthDb(options.dbOptions ?? {})
    if (options.makeUserId) {
      state.makeUserId = options.makeUserId
    }
  },
}
