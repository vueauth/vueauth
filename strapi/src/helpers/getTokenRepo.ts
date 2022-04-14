import getStrapiConfig from 'src/getStrapiConfig'
import { UseTokenRepoReturn } from 'src/types/UseTokenRepo'

function getTokenRepo (): UseTokenRepoReturn {
  return getStrapiConfig().useTokenRepo()
}

export {
  getTokenRepo,
}
