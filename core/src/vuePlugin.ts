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
  if (providerName) {
    app.provide(Symbol.for(`${providerName}:${featureKey}`), feature)
  } else {
    app.provide(Symbol.for(featureKey), feature)
  }
}

const VuePlugin = {
  install: (app: App, options: PluginOptions) => {
    app.provide(DefaulAuthProviderSymbol, options.default)
    const providers = Object.keys(options.providers)
    providers.forEach(providerKey => {
      provideFeatures(options.providers[providerKey], providerKey, app)
    })
  }
}

export {
  VuePlugin,
  VuePlugin as default,
  PluginOptions
}
