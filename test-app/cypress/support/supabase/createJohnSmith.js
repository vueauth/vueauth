
import { createClient } from '@supabase/supabase-js'
import supabaseCredentials from './supabase-credentials.js'

const supabaseUrl = 'https://uqzabkzhrgumibxtlgze.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseCredentials.key)

async function createJohnSmith () {
  await supabase.auth.signUp({
    email: 'john@example.com',
    password: 'asdfasdf'
  })
}

createJohnSmith()