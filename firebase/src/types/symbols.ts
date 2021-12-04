import { FirebaseApp } from 'firebase/app'
import { InjectionKey } from 'vue-demi'

const FirebaseAppKey: InjectionKey<FirebaseApp> = Symbol('FirebaseDefaultApp')

export {
  FirebaseAppKey
}
