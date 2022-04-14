import { Providers } from '../src/types/Providers'
import firebase from './firebase'
import supabase from './supabase'
import strapi from './strapi'
import sanctum from './sanctum'

const providers: Providers = {
  firebase,
  supabase,
  strapi,
  sanctum,
}

export {
  providers as default,
  providers,
}
