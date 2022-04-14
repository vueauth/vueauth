import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const app = initializeApp({
  databaseURL: 'https://quasarv2-firebase.firebaseio.com',
})

getAuth(app)
  .createUser({
    email: 'john@example.com',
    emailVerified: false,
    password: 'asdfasdf',
    displayName: 'John Smith',
    disabled: false,
  })
  .then((userRecord) => {
    console.log('Successfully created new user:', userRecord.uid)
  })
  .catch((error) => {
    console.log('Error creating new user:', error)
  })
