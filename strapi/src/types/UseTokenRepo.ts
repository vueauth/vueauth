import { Ref } from 'vue'

interface UseTokenRepoReturn {
  /**
   * Set the token in storage
   */
  set: (token: string) => Promise<boolean>
  /**
   * Retrieve the stored token
   */
  get: () => Promise<string>
  /**
   * remove the token. Usually this means
   * "logging out" the user
   */
  remove: () => Promise<boolean>
  /**
   * A reactive ref of the token (usually a jwt)
   */
  token: Ref<string>
}

type UseTokenRepo = () => UseTokenRepoReturn

export {
  UseTokenRepo as default,
  UseTokenRepo,
  UseTokenRepoReturn,
}
