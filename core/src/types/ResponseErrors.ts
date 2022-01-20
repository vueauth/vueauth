interface ResponseError {
  type: string
  message: string
}

type ResponseErrors = ResponseError[]

export default ResponseErrors

export {
  ResponseError,
}
