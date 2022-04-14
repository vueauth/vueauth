interface ValidationError {
  message: string
  name: string
  path: string[]
}

type ValidationErrors = ValidationError[]

export default ValidationErrors

export {
  ValidationError,
}
