export interface ResponseAssertion {
  action: string
  urlGlob: string
  statusCode: number
}

export interface Provider {
  register: {
  beforeCommand?: string
    hasNameField: boolean
    hasUsernameField?: boolean
    response?: ResponseAssertion
  }
  login: {
    beforeCommand?: string
    response?: ResponseAssertion
  }
  logout: {
    beforeCommand?: string
    response?: ResponseAssertion
  }
}

export interface Providers {
  [key: string]: Provider
}
