import { Feature, FeaturesConfigs, type PluginOptions, Provider } from './types/PluginOptions'
import { App, ref } from 'vue'
import { DefaultAuthProviderSymbol } from './symbols/defaultProviderSymbol'

function provideFeatures (
  provider: Provider,
  providerName = '',
  app: App,
) {
  const features = provider.features
  const featureKeys = Object.keys(features) as (keyof FeaturesConfigs)[]

  featureKeys.forEach(featureKey => {
    let feature
    if (typeof features[featureKey] === 'object') {
      feature = features[featureKey].composable
    } else {
      feature = features[featureKey]
    }

    if(!feature) return

    provideFeature(featureKey, feature, providerName, app)
  })
}

function provideFeature (
  featureKey: string,
  feature: Feature,
  providerName: string,
  app: App,
) {
  app.provide(Symbol.for(`auth:${providerName}:${featureKey}`), feature)
}

function provideFeaturesConfig (
  featureKey: string,
  featureConfig: Record<string, unknown>,
  providerName: string,
  app: App,
) {
  app.provide(
    Symbol.for(`auth:${providerName}.${featureKey}.config`),
    featureConfig,
  )
}

function provideConfig (
  provider: Provider,
  providerName: string,
  app: App,
) {
  const features = provider.features
  const featureKeys = Object.keys(features) as (keyof FeaturesConfigs)[]
  const allConfigs: any = {}

  featureKeys.forEach(featureKey => {
    const feature = features[featureKey]
    if(!feature) return
    let config = {}
    if ('baseConfig' in feature) {
      config = Object.assign({}, feature.baseConfig)
    }

    if (typeof feature === 'object' && 'config' in feature) {
      if (typeof feature.composable !== 'function') {
        throw new Error(`The feature ${featureKey} is missing an implementation`)
      }
      if ('baseConfig' in feature.composable) {
        config = Object.assign({}, feature.composable.baseConfig)
      }
      Object.assign(config, feature.config)
    }
    provideFeaturesConfig(featureKey, config, providerName, app)
    allConfigs[featureKey] = config
  })

  app.provide(Symbol.for(`auth:${providerName}.config`), allConfigs)
}

const AuthPlugin = {
  install: (app: App, configs: PluginOptions) => {
    app.provide(DefaultAuthProviderSymbol, ref(configs.default))
    const providers = Object.keys(configs.providers)
    providers.forEach(providerKey => {
      provideFeatures(configs.providers[providerKey], providerKey, app)
      provideConfig(configs.providers[providerKey], providerKey, app)
    })
  },
}

export {
  AuthPlugin,
  AuthPlugin as default,
  PluginOptions,
}
