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
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
