import { App } from 'vue'
import { state } from './state'
import PluginOptions from '../types/PluginOptions'
import { IndexedDbAppKey } from '../types/symbols'
import { AuthDb } from 'src/db/AuthDb'

export const IndexedDbPlugin = {
  install: (vueApp: App, options: PluginOptions) => {
    vueApp.provide(IndexedDbAppKey, options)
    state.db = new AuthDb(options.dbOptions ?? {})
    if (options.makeUserId) {
      state.makeUserId = options.makeUserId
    }
  },
}
