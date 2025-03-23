import { InjectionKey } from 'vue'
import { SanctumConfig } from './PluginOptions'

const SanctumAppKey: InjectionKey<SanctumConfig> = Symbol.for('SanctumDefaultApp')

export {
  SanctumAppKey,
}
