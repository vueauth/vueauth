import Requester, { SanctumResponse } from '../types/Requester'
import { createFetch, UseFetchReturn } from '@vueuse/core'
import { useCookies } from '@vueuse/integrations/useCookies'

export const makeFetchRequester = (
  baseUrl: string | undefined = undefined
): Requester => {
  const cookies = useCookies(['XSRF-TOKEN'])

  function makeSanctumResponse<T> (fetch: UseFetchReturn<T>): SanctumResponse<T> {
    return {
      isFinished: fetch.isFinished.value,
      statusCode: fetch.statusCode.value,
      response: fetch.response.value,
      asJson: () => {
        if (typeof fetch.data.value === 'string') {
          return JSON.parse(fetch.data.value)
        }
        return {}
      },
      error: fetch.error.value,
      data: fetch.data.value as T,
      isFetching: fetch.isFetching.value
    }
  }

  const useFetch = createFetch({
    baseUrl,
    fetchOptions: {
      headers: {
        Accept: 'application/json'
      }
    },
    options: {
      beforeFetch ({ options }) {
        const xsrfToken = cookies.get('XSRF-TOKEN')
        if (!options.headers) {
          options.headers = {}
        }
        options.headers['X-XSRF-TOKEN'] = xsrfToken
      },
      immediate: false
    }
  })

  const loginFetcher = useFetch('/login')
  const registerFetcher = useFetch('/register')
  const logoutFetcher = useFetch('/logout')
  const userFetcher = useFetch<Record<string | number, unknown> | null>('api/user')
  const csrfTokenFetcher = useFetch('/sanctum/csrf-cookie')

  async function fetchCsrfToken () {
    await csrfTokenFetcher.get().execute()
    return makeSanctumResponse(csrfTokenFetcher)
  }

  async function login (credentials: Record<string, string | number>) {
    await fetchCsrfToken()
    await loginFetcher.post(credentials).execute()
    return makeSanctumResponse(loginFetcher)
  }

  async function register (credentials: Record<string, string | number>) {
    await fetchCsrfToken()
    await registerFetcher.post(credentials).execute()
    return makeSanctumResponse(registerFetcher)
  }

  async function logout () {
    await logoutFetcher.post().execute()
    return makeSanctumResponse(logoutFetcher)
  }

  async function getUser () {
    await userFetcher.get().json().execute()
    return makeSanctumResponse(userFetcher)
  }

  return {
    fetchCsrfToken,
    login,
    register,
    logout,
    getUser
  }
}

export default makeFetchRequester
