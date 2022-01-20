import availableProviders from "./availableProviders"
import { Providers } from "./src/types/Providers"

function getProviders (): Providers {
  const providersFromEnv = Cypress.env('providers')

  if(providersFromEnv) {
    const providers = {}
    const providersFromEnvArray = providersFromEnv.split(',')
    providersFromEnvArray.forEach((provider: string) => {
      if(!availableProviders[provider]) {
        throw new Error(
          `${provider} is not a valid provider. valid providers include: ` +
          Object.keys(availableProviders).join(', '));
      }
      providers[provider] = availableProviders[provider]
    })
    return providers
  }

  return availableProviders
}

export {
  getProviders as default,
  getProviders
}