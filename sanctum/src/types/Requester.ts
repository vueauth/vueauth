import User from './User'

interface SanctumResponse<T> {
  isFinished: boolean
  statusCode: number | null
  response: Response | null
  asJson: () => Record<string | number, unknown> | undefined
  error: unknown
  data: T
  isFetching: boolean
}

interface ResetPasswordForm {
  email: string
  password: string
  password_confirmation: string
  token?: string
}

interface ResetPasswordRequestForm {
  email: string
}

export default interface Requester {
  login: (credentials: Record<string, string | number>) => Promise<SanctumResponse<unknown>>,
  register: (credentials: Record<string, string | number>) => Promise<SanctumResponse<unknown>>,
  logout: () => Promise<SanctumResponse<unknown>>,
  fetchCsrfToken: () => Promise<SanctumResponse<unknown>>,
  getUser: () => Promise<SanctumResponse<User>>,
  forgotPassword: (form: ResetPasswordRequestForm) => Promise<SanctumResponse<unknown>>,
  resetPassword: (form: ResetPasswordForm) => Promise<SanctumResponse<unknown>>,
}

export {
  SanctumResponse,
  ResetPasswordForm,
  ResetPasswordRequestForm
}
