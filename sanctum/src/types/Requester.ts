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

export default interface Requester {
  login: (credentials: Record<string, string | number>) => Promise<SanctumResponse<unknown>>,
  register: (credentials: Record<string, string | number>) => Promise<SanctumResponse<unknown>>,
  logout: () => Promise<SanctumResponse<unknown>>,
  fetchCsrfToken: () => Promise<SanctumResponse<unknown>>,
  getUser: () => Promise<SanctumResponse<User>>
}

export {
  SanctumResponse
}
