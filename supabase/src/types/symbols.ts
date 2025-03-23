import { SupabaseClient } from '@supabase/supabase-js'
import { InjectionKey } from 'vue'

const SupabaseClientKey: InjectionKey<SupabaseClient> = Symbol('SupabaseDefaultClient')

export {
  SupabaseClientKey,
}
