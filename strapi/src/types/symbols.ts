import { InjectionKey } from 'vue-demi'
import { StrapiConfig } from './PluginOptions'

const StrapiAppKey: InjectionKey<StrapiConfig> = Symbol.for('StrapiDefaultApp')

export {
  StrapiAppKey,
}
