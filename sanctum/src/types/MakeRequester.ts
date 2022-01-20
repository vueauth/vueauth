import User from './User'

export interface SanctumResponse<T> {
  isFinished: boolean
  statusCode: number | null
  response: Response | null
  asJson: () => Record<string | number, unknown> | undefined
  error: unknown
  data: T
  isFetching: boolean
}

export interface ResetPasswordForm {
  email: string
  password: string
  password_confirmation: string
  token?: string
}

export interface ResetPasswordRequestForm {
  email: string
}

export interface UpdatePasswordForm {
  current_password: string
  password: string
  password_confirmation: string
}

export default interface MakeRequesterReturn {
  login: (credentials: Record<string, string | number>) => Promise<SanctumResponse<unknown>>,
  register: (credentials: Record<string, string | number>) => Promise<SanctumResponse<unknown>>,
  logout: () => Promise<SanctumResponse<unknown>>,
  fetchCsrfToken: () => Promise<SanctumResponse<unknown>>,
  getUser: () => Promise<SanctumResponse<User>>,
  forgotPassword: (form: ResetPasswordRequestForm) => Promise<SanctumResponse<unknown>>,
  resetPassword: (form: ResetPasswordForm) => Promise<SanctumResponse<unknown>>,
  updatePassword: (form: UpdatePasswordForm) => Promise<SanctumResponse<unknown>>
}

export type MakeRequester = (url?: string) => MakeRequesterReturn
