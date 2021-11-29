import { FirebaseApp } from 'firebase/app'
import { InjectionKey } from '@vue/runtime-core'

const FirebaseAppKey: InjectionKey<FirebaseApp> = Symbol('FirebaseDefaultApp')

export {
  FirebaseAppKey
}