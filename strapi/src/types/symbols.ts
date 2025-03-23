import { InjectionKey } from 'vue'
import { StrapiConfig } from './PluginOptions'

const StrapiAppKey: InjectionKey<StrapiConfig> = Symbol.for('StrapiDefaultApp')

export {
  StrapiAppKey,
}
