import { inject } from 'vue-demi'
import { SupabaseClientKey } from './types/symbols'

export const useClient = () => {
  const client = inject(SupabaseClientKey)
  if (!client) {
    throw Error('Error injecting supabase client')
  }
  return client
}

export default useClient
