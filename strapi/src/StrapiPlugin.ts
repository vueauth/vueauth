import { App, Plugin } from 'vue'
import PluginOptions from './types/PluginOptions'
import { StrapiAppKey } from './types/symbols'
import defaultConfig from './defaultConfig'
import { makeFetchRequester } from './implementations/makeFetchRequester'
import { deepmerge } from 'deepmerge-ts'

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
