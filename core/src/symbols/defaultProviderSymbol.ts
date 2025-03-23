import { MaybeRefOrGetter } from 'vue'
import { InjectionKey } from 'vue'

export const DefaultAuthProviderSymbol: InjectionKey<MaybeRefOrGetter<string>> = Symbol.for('auth:defaultProvider')
