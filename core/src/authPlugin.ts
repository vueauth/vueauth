import { Feature, PluginOptions, Provider } from './types/PluginOptions'
import { App, ref } from 'vue-demi'
import { DefaultAuthProviderSymbol } from './symbols/defaultProviderSymbol'

function provideFeatures (
  provider: Provider,
  providerName = '',
  app: App,
) {
  const features = provider.features
  const featureKeys = Object.keys(features)

  featureKeys.forEach(featureKey => {
    let feature
    if (typeof features[featureKey] === 'object' && features[featureKey].composable) {
      feature = features[featureKey].composable
    } else {
      feature = features[featureKey]
    }

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
  const featureKeys = Object.keys(features)
  const allConfigs = {}

  featureKeys.forEach(featureKey => {
    const feature = features[featureKey]
    let config = {}
    if (feature.baseConfig) {
      config = Object.assign({}, feature.baseConfig)
    }

    if (typeof feature === 'object' && feature.config) {
      if (typeof feature.composable !== 'function') {
        throw new Error(`The feature ${featureKey} is missing an implementation`)
      }
      if (feature.composable.baseConfig) {
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
