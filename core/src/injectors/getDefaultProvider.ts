import { DefaultAuthProviderSymbol } from '../symbols/defaultProviderSymbol'
import { inject, unref } from 'vue-demi'

export const getDefaultProvider = (): string => {
  const defaultAuthProvider = inject(DefaultAuthProviderSymbol)
  if (defaultAuthProvider) {
    return unref(defaultAuthProvider)
  }
  throw new Error('default auth provider key not found')
}
