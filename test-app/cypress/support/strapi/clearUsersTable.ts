import { Client } from 'pg'

const client = new Client({
  user: 'strapi',
  host: 'localhost',
  database: 'strapi',
  password: 'strapi',
  port: 5433,
})
client.connect()
client.query('DELETE FROM up_users WHERE true', (err, res) => {
  if (err) {
    client.end()
    throw err
  }
  console.log('deleted all users')
  client.end()
})
