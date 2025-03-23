import getStrapiConfig from '../getStrapiConfig'
import { UseTokenRepoReturn } from '../types/UseTokenRepo'

function getTokenRepo (): UseTokenRepoReturn {
  return getStrapiConfig().useTokenRepo()
}

export {
  getTokenRepo,
}
