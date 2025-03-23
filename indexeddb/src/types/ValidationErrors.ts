type ValidationError = Record<string | number, string>

type ValidationErrors = Record<string | number, ValidationError[]>

export default ValidationErrors

export {
  ValidationError,
}
