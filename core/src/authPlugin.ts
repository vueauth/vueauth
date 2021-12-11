import { Feature, PluginOptions, Provider } from './Types/PluginOptions'
import { App } from 'vue-demi'
import { DefaulAuthProviderSymbol } from './Symbols/defaultProviderSymbol'

function provideFeatures (
  provider: Provider,
  providerName = '',
  app: App
) {
  const features = provider.features
  const featureKeys = Object.keys(features)

  featureKeys.forEach(featureKey => {
    provideFeature(featureKey, features[featureKey], providerName, app)
  })
}

function provideFeature (
  featureKey: string,
  feature: Feature,
  providerName: string,
  app: App
) {
  app.provide(Symbol.for(`auth:${providerName}:${featureKey}`), feature)
}

function provideFeaturesOptions (
  featureKey: string,
  featureOptions: Record<string, unknown>,
  providerName: string,
  app: App
) {
  app.provide(
    Symbol.for(`auth:${providerName}.${featureKey}.options`),
    featureOptions
  )
}

function provideOptions (
  provider: Provider,
  providerName: string,
  app: App
) {
  const features = provider.features
  const featureKeys = Object.keys(features)
  const allOptions = {}

  featureKeys.forEach(featureKey => {
    const feature = features[featureKey]
    if (feature.baseOptions) {
      const options = { ...feature.baseOptions }
      if (typeof feature === 'object' && feature.options) {
        Object.assign(options, feature.options)
      }
      provideFeaturesOptions(featureKey, options, providerName, app)
      allOptions[featureKey] = options
    }
  })

  app.provide(Symbol.for(`auth:${providerName}.options`), allOptions)
}

const AuthPlugin = {
  install: (app: App, options: PluginOptions) => {
    app.provide(DefaulAuthProviderSymbol, options.default)
    const providers = Object.keys(options.providers)
    providers.forEach(providerKey => {
      provideFeatures(options.providers[providerKey], providerKey, app)
      provideOptions(options.providers[providerKey], providerKey, app)
    })
  }
}

export {
  AuthPlugin,
  AuthPlugin as default,
  PluginOptions
}
