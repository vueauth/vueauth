// Credit VueUse: https://github.com/vueuse/vueuse/blob/3e55a721142f6e05da6a131efe8da4251d35c24e/packages/shared/tryOnScopeDispose/index.ts#L9

import { getCurrentScope, onScopeDispose } from 'vue'

export function tryOnScopeDispose(fn: () => void) {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}