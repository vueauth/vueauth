import { App } from 'vue-demi'
import { createClient } from '@supabase/supabase-js'
import { SupabaseClientKey } from './types/symbols'
import { useAuthState } from './implementations/useAuthState'

export interface VuePluginOptions {
  credentials: {
    supabaseUrl: string,
    supabaseKey: string
  }
}

export const SupabasePlugin = {
  install: (vueApp: App, options: VuePluginOptions) => {
    if (!options || !options.credentials || !options.credentials.supabaseKey || !options.credentials.supabaseUrl) {
      throw Error('Credentials must be provided when installing supabase')
    }
    const { supabaseUrl, supabaseKey } = options.credentials
    const client = createClient(supabaseUrl, supabaseKey)

    const { user, authIsReady } = useAuthState()

    client.auth.onAuthStateChange((_, session) => {
      authIsReady.value = true
      user.value = session?.user ?? null
    })

    vueApp.provide(SupabaseClientKey, client)
  },
}

export default SupabasePlugin
