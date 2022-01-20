import { SupabaseClient } from '@supabase/supabase-js'
import { InjectionKey } from 'vue-demi'

const SupabaseClientKey: InjectionKey<SupabaseClient> = Symbol('SupabaseDefaultClient')

export {
  SupabaseClientKey,
}
