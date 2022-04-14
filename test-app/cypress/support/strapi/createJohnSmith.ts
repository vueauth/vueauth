import { Client } from 'pg'

const client = new Client({
  user: 'strapi',
  host: 'localhost',
  database: 'strapi',
  password: 'strapi',
  port: 5433,
})
client.connect()

const createJohnQuery = `INSERT INTO up_users (
  username,
  email,
  provider,
  confirmed,
  blocked,
  password
)
VALUES (
  'john@example.com',
  'john@example.com',
  'local',
  true,
  false,
  '$2a$10$OSABJwQeqX1HvaAe/cKVBOWBWEXyKh/PQMD80BiEpHTNN96bCF5Ra'
)
RETURNING id;`

client.query(createJohnQuery, (err, res) => {
  if (err) {
    client.end()
    throw err
  }
  console.log(res)
  console.log('created john smith (password: asdfasdf)')
  const id = res.rows[0].id

  const insertRoleQuery = `INSERT INTO up_users_role_links (
    user_id,
    role_id
  )
  VALUES (
    ${id},
    1
  )
  `

  client.query(insertRoleQuery, () => {
    client.end()
  })
})
