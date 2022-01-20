import * as pg from 'pg'
import supabaseCredentials from './supabase-credentials.js'
const { Client } = pg.default

async function deleteJohnSmith () {
  const client = new Client({
    user: 'postgres',
    host: supabaseCredentials.host,
    password: supabaseCredentials.password,
    database: 'postgres',
    port: 5432
  })
  await client.connect()
  await client.query('DELETE FROM auth.users WHERE email=$1', ['john@example.com'])
  await client.end()
}

deleteJohnSmith()
