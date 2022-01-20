import { MaybeRef } from '@vueuse/core'
import { InjectionKey } from 'vue-demi'

export const DefaultAuthProviderSymbol: InjectionKey<MaybeRef<string>> = Symbol.for('auth:defaultProvider')
