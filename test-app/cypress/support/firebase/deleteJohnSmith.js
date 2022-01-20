import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const app = initializeApp({
  databaseURL: 'https://quasarv2-firebase.firebaseio.com'
})

const auth = getAuth(app)

async function deleteJohnSmith () {
  try {
    const user = await auth.getUserByEmail('john@example.com')
    auth.deleteUser(user.uid)
  } catch (err) {
    console.log(err.message)
  }
}

deleteJohnSmith()
