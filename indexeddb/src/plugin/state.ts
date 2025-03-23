import { generateRandomString } from 'src/utils/generateRandomString'
import { AuthDb } from '../db/AuthDb'

export interface IndexedDbState {
  key: string
  db?: AuthDb
  makeUserId: () => string
}

export const state: IndexedDbState = {
  key: 'vueauth',
  makeUserId: () => generateRandomString(8),
}
