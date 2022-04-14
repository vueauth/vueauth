import { useLocalStorage, createGlobalState } from '@vueuse/core'
import { UseTokenRepoReturn } from 'src/types/UseTokenRepo'

const useLocalStorageTokenRepo = createGlobalState<UseTokenRepoReturn>(() => {
  const localStorageToken = useLocalStorage<string>('strapi-authorization-token', '', {})

  async function set (token: string) {
    localStorageToken.value = token
    return true
  }

  async function get () {
    return localStorageToken.value
  }

  async function remove () {
    localStorageToken.value = ''
    return true
  }

  return {
    set,
    get,
    remove,
    token: localStorageToken,
  }
},
)

export {
  useLocalStorageTokenRepo as default,
  useLocalStorageTokenRepo,
}
