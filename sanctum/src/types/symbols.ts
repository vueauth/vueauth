import { InjectionKey } from 'vue-demi'
import SanctumConfig from './SanctumConfig'

const SanctumAppKey: InjectionKey<SanctumConfig> = Symbol.for('SanctumDefaultApp')

export {
  SanctumAppKey,
}
