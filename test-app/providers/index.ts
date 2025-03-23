import { Providers } from '../src/types/Providers'
import firebase from './firebase'
import supabase from './supabase'
import strapi from './strapi'
import sanctum from './sanctum'
import indexeddb from './indexeddb'

const providers: Providers = {
  firebase,
  supabase,
  strapi,
  sanctum,
  indexeddb,
}

export {
  providers as default,
  providers,
}
