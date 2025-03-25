import { App, Plugin } from 'vue'
import PluginOptions from './types/PluginOptions'
import { SanctumAppKey } from './types/symbols'
import deepmerge from 'deepmerge'
import defaultConfig from './defaultConfig'
import { makeFetchRequester } from './implementations/makeFetchRequester'

export const SanctumPlugin: Plugin<PluginOptions> = {
  install: (vueApp: App, options = {}) => {
    options = deepmerge(defaultConfig(), options)
    vueApp.provide(SanctumAppKey, options)
    if (!options.makeRequester) {
      options.makeRequester = makeFetchRequester
    }
  },
}

export default SanctumPlugin
