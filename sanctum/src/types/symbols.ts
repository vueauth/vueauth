import { InjectionKey } from 'vue-demi'
import { SanctumConfig } from './PluginOptions'

const SanctumAppKey: InjectionKey<SanctumConfig> = Symbol.for('SanctumDefaultApp')

export {
  SanctumAppKey,
}
