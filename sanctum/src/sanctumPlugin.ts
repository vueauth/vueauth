import makeFetchRequester from './implementations/makeFetchRequester'
import { App } from 'vue-demi'
import PluginOptions from './types/PluginOptions'
import { SanctumAppKey } from './types/symbols'
import useVueUseAuthState from './implementations/useVueUseAuthState'

export const sanctumPlugin = {
  install: (vueApp: App, options: PluginOptions = {}) => {
    if (!options.useAuthState) {
      options.useAuthState = useVueUseAuthState
    }
    if (!options.requester) {
      options.requester = makeFetchRequester()
    }
    vueApp.provide(SanctumAppKey, options)
  }
}

export default sanctumPlugin
