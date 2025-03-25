import { App, Plugin } from 'vue'
import PluginOptions from './types/PluginOptions'
import { StrapiAppKey } from './types/symbols'
import deepmerge from 'deepmerge'
import defaultConfig from './defaultConfig'
import { makeFetchRequester } from './implementations/makeFetchRequester'

export const StrapiPlugin: Plugin<PluginOptions> = {
  install: (vueApp: App, options = {}) => {
    options = deepmerge(defaultConfig(), options)
    vueApp.provide(StrapiAppKey, options)
    if (!options.makeRequester) {
      options.makeRequester = makeFetchRequester
    }
  },
}

export default StrapiPlugin
