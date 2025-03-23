import { InjectionKey } from 'vue'
import { IndexedDbConfig } from './PluginOptions'

const IndexedDbAppKey: InjectionKey<IndexedDbConfig> = Symbol.for('IndexedDbDefaultApp')

export {
  IndexedDbAppKey,
}
