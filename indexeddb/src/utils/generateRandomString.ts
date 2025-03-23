export function generateRandomString (length = 10) {
  return [...Array(length)].map(() => Math.random().toString(36)[2]).join('')
}
