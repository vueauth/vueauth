import { FirebaseApp } from 'firebase/app'
import { InjectionKey } from 'vue'

const FirebaseAppKey: InjectionKey<FirebaseApp> = Symbol('FirebaseDefaultApp')

export {
  FirebaseAppKey,
}
