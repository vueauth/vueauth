import Requester, { ResetPasswordForm, ResetPasswordRequestForm, SanctumResponse, UpdatePasswordForm } from '../types/Requester'
import { createFetch, UseFetchReturn } from '@vueuse/core'
import { useCookies } from '@vueuse/integrations/useCookies'

export const makeFetchRequester = (
  baseUrl: string | undefined = undefined,
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
        if (typeof fetch.data.value === 'object') {
          return fetch.data.value
        }
        return {}
      },
      error: fetch.error.value,
      data: fetch.data.value as T,
      isFetching: fetch.isFetching.value,
    }
  }

  const useFetch = createFetch({
    baseUrl,
    fetchOptions: {
      headers: {
        Accept: 'application/json',
      },
    },
    options: {
      beforeFetch ({ options }) {
        const xsrfToken = cookies.get('XSRF-TOKEN')
        if (!options.headers) {
          options.headers = {}
        }
        options.headers['X-XSRF-TOKEN'] = xsrfToken
      },
      immediate: false,
    },
  })

  const loginFetcher = useFetch('/login')
  const registerFetcher = useFetch('/register')
  const logoutFetcher = useFetch('/logout')
  const userFetcher = useFetch<Record<string | number, unknown> | null>('api/user')
  const csrfTokenFetcher = useFetch('/sanctum/csrf-cookie')
  const resetPasswordFetcher = useFetch('/reset-password')
  const forgotPasswordFetcher = useFetch('/forgot-password')
  const updatePasswordFetcher = useFetch('/user/password')

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

  async function updatePassword (form: UpdatePasswordForm) {
    await updatePasswordFetcher.put(form).json().execute()
    return makeSanctumResponse(updatePasswordFetcher)
  }

  async function resetPassword (form: ResetPasswordForm) {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    if (typeof token !== 'string') {
      throw Error('"token" missing: Unable to find the query paramater "token"')
    }
    form.token = token
    await resetPasswordFetcher.post(form).json().execute()
    return makeSanctumResponse(resetPasswordFetcher)
  }

  async function forgotPassword (form: ResetPasswordRequestForm) {
    await fetchCsrfToken()
    await forgotPasswordFetcher.post(form).json().execute()
    return makeSanctumResponse(forgotPasswordFetcher)
  }

  return {
    fetchCsrfToken,
    login,
    register,
    logout,
    getUser,
    resetPassword,
    forgotPassword,
    updatePassword,
  }
}

export default makeFetchRequester
