import Requester, { LoginResponse, RegisterResponse, ResetPasswordForm, ResetPasswordRequestForm, StrapiResponse, UpdatePasswordForm, UpdatePasswordResponse } from '../types/MakeRequester'
import { createFetch, UseFetchReturn } from '@vueuse/core'
import { StrapiEndpoints } from '../types/PluginOptions'
import getStrapiConfig from '../getStrapiConfig'
import { getTokenRepo } from '../helpers/getTokenRepo'

const makeFetchRequester = (
  baseUrl: string | undefined = undefined,
): Requester => {
  const { endpoints: configuredEndpoints, baseUrl: configuredBaseUrl } = getStrapiConfig()

  baseUrl = baseUrl ?? configuredBaseUrl

  const endpoints: StrapiEndpoints = configuredEndpoints

  const tokenRepo = getTokenRepo()

  function makeStrapiResponse<T> (fetch: UseFetchReturn<T>): StrapiResponse<T> {
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
      data: fetch.data.value,
      isFetching: fetch.isFetching.value,
    }
  }

  const useFetch = createFetch({
    baseUrl,
    fetchOptions: {
      mode: 'cors',
      headers: {
        Accept: 'application/json',
      },
    },
    options: {
      async beforeFetch ({ options }) {
        options.headers = {}
        const token = await tokenRepo.get()
        if (!token) {
          return
        }
        options.headers.Authorization = 'Bearer ' + token
      },
      immediate: false,
    },
  })

  const loginFetcher = useFetch<LoginResponse>(endpoints.login)
  const registerFetcher = useFetch<RegisterResponse>(endpoints.register)
  const userFetcher = useFetch<Record<string | number, unknown> | null>(endpoints.getUser)
  const resetPasswordFetcher = useFetch(endpoints.resetPassword)
  const forgotPasswordFetcher = useFetch(endpoints.forgotPassword)
  const updatePasswordFetcher = useFetch<UpdatePasswordResponse>(endpoints.changePassword)

  async function login (credentials: Record<string, string | number>) {
    await loginFetcher.post(credentials).execute()
    return makeStrapiResponse(loginFetcher)
  }

  async function register (credentials: Record<string, string | number>) {
    await registerFetcher.post(credentials).execute()
    return makeStrapiResponse<RegisterResponse>(registerFetcher)
  }

  async function getUser () {
    await userFetcher.get().json().execute()
    return makeStrapiResponse(userFetcher)
  }

  async function updatePassword (form: UpdatePasswordForm) {
    await updatePasswordFetcher.put(form).json().execute()
    return makeStrapiResponse<UpdatePasswordResponse>(updatePasswordFetcher)
  }

  async function resetPassword (form: ResetPasswordForm) {
    // window.location.search does not work with hash routes,
    // hence we use "split" as it's a more tolerant approach
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const code = urlParams.get('code')
    if (typeof code !== 'string') {
      throw Error('"code" missing: Unable to find the query paramater "code"')
    }
    const strapiForm = {
      code,
      password: form.password,
      passwordConfirmation: form.password_confirmation,
    }
    await resetPasswordFetcher.post(strapiForm).json().execute()
    return makeStrapiResponse(resetPasswordFetcher)
  }

  async function forgotPassword (form: ResetPasswordRequestForm) {
    await forgotPasswordFetcher.post(form).json().execute()
    return makeStrapiResponse(forgotPasswordFetcher)
  }

  return {
    login,
    register,
    getUser,
    resetPassword,
    forgotPassword,
    updatePassword,
  }
}

export {
  makeFetchRequester as default,
  makeFetchRequester,
}
