import { inject, InjectionKey } from 'vue-demi'

export const useFeature = <ComposableFunction, ComposableReturn>(
  authProvider = '',
  featureId: string,
  ...args: any[]
): ComposableReturn => {
  let ProvideKey: InjectionKey<ComposableFunction>
  if (authProvider) {
    ProvideKey = Symbol.for(`${authProvider}:${featureId}`)
  } else {
    ProvideKey = Symbol.for(featureId)
  }

  const composable = inject(ProvideKey)
  if (composable && typeof composable === 'function') {
    return composable(...args)
  } else {
    throw new Error(`unable to find inject key: ${ProvideKey.toString()}`)
  }
}

export default useFeature
