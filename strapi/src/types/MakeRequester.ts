import User from './User'
import ValidationErrors from './ValidationErrors'

export interface ErrorResponse {
  data: unknown
  error: {
    message: string
    name: string
    status: number
    details?: {
      errors?: ValidationErrors
      [index: string]: unknown
    }
  }
}

export interface RegisterResponse {
  jwt: string,
  user: {
    blocked: boolean
    confirmed: boolean
    createdAt: string
    updatedAt: string
    username: string
    email: string
    id: number
    provider: string
  }
}

export interface LoginResponse {
  jwt: string,
  user: {
    blocked: boolean
    confirmed: boolean
    createdAt: string
    updatedAt: string
    username: string
    email: string
    id: number
    provider: string
  }
}

export interface StrapiResponse<T> {
  isFinished: boolean
  statusCode: number | null
  response: Response | null
  asJson: () => T
  error: unknown
  data: T | null
  isFetching: boolean
}

export interface ResetPasswordForm {
  email: string
  password: string
  password_confirmation: string
  code?: string
}

export interface ResetPasswordRequestForm {
  email: string
}

export interface UpdatePasswordForm {
  password: string
  newPassword: string
  confirmPassword: string
}

export interface UpdatePasswordResponse {
  jwt: string
  user: User
}

export default interface MakeRequesterReturn {
  login: (credentials: Record<string, string | number>) => Promise<StrapiResponse<LoginResponse>>,
  register: (credentials: Record<string, string | number>) => Promise<StrapiResponse<RegisterResponse>>,
  getUser: () => Promise<StrapiResponse<User>>,
  forgotPassword: (form: ResetPasswordRequestForm) => Promise<StrapiResponse<unknown>>,
  resetPassword: (form: ResetPasswordForm) => Promise<StrapiResponse<unknown>>,
  updatePassword: (form: UpdatePasswordForm) => Promise<StrapiResponse<UpdatePasswordResponse>>
}

export type MakeRequester = (url?: string) => MakeRequesterReturn
