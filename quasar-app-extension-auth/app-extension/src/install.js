import addAuthenticateRoutes from "./addAuthenticateRoutes.js"
import addAuthRoutesToRoutesFile from "./addAuthRoutesToRoutesFile.js"
import addBootFile from "./addBootFile.js"
import providerDependencies from "./providerDependencies.js"

export default async function (api) {
  const hasTypescript = api.hasTypescript()
  const subfolderName = hasTypescript ? 'ts' : 'js'
  const provider = api.prompts.authProvider
  const authProviderPackage = provider.packageName
  const authProviderIdentifier = provider.identifier
  const authProviderIdentifierPascal = capitalizeFirstLetter(authProviderIdentifier)

  api.render(`./templates/${subfolderName}`, {
    authProviderPackage,
    authProviderIdentifier,
    authProviderIdentifierPascal
  })
  
  api.render(`./provider-specific-templates/${subfolderName}/${authProviderIdentifier}`)

  const dependencies = providerDependencies[authProviderIdentifier]

  if (dependencies) {
    api.extendPackageJson(dependencies)
  }

  if (api.prompts.setup.includes('injectAuthRoutes')) {
    const routesFile = api.resolve.src(`router/routes.${subfolderName}`)
    addAuthRoutesToRoutesFile(routesFile, subfolderName)
  }

  if (api.prompts.setup.includes('injectAuthenticateRoutes')) {
    const appVueFile = api.resolve.src('App.vue')
    addAuthenticateRoutes(appVueFile, subfolderName)
  }

  if (api.prompts.setup.includes('registerBootFile')) {
    const quasarConfigFile = api.resolve.app(`quasar.config.${subfolderName}`)
    addBootFile(quasarConfigFile, 'vueauth')
  }
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
