import { inject } from 'vue-demi'
import { getConfig } from './getConfig'
import { getDefaultProvider } from './getDefaultProvider'

export type UseFeatureConfig = {
  authProvider?: string
}

export interface FeatureBaseConfig {
  composable: string
  [key: string]: unknown
}

// export type UnknownComposable = ()

export interface UnknownComposable {
  (...args: any[]): never
  baseConfig?: unknown
}

export const useFeature = <ComposableFunctionReturn>(
  featureId: string,
  config: UseFeatureConfig,
  ...args: any[]
): ComposableFunctionReturn => {
  config.authProvider = config.authProvider ?? getDefaultProvider()

  // Merge base config with supplied config
  const baseConfig = getConfig<FeatureBaseConfig>(featureId, config.authProvider)

  // Create the provide key
  const ProvideKey = Symbol.for(
    `auth:${config.authProvider}:${featureId}`,
  )

  // Inject the composable using provide key
  const composable = inject<UnknownComposable>(ProvideKey)

  // if we have the composable return it, otherwise error
  if (composable && typeof composable === 'function') {
    let mergedConfig: Record<string, unknown>
    if (composable.baseConfig && typeof composable.baseConfig === 'object') {
      mergedConfig = { ...composable.baseConfig, ...baseConfig, ...config }
    } else {
      mergedConfig = { ...baseConfig, ...config }
    }

    return composable(mergedConfig, ...args)
  } else {
    throw new Error(`unable to find inject key: ${ProvideKey.toString()}`)
  }
}

export default useFeature
