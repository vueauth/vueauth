import { getFirestore } from 'firebase/firestore'
import useApp from '../useApp'

const getFirestoreFunction = () => {
  const app = useApp()
  return getFirestore(app)
}

export {
  getFirestoreFunction as getFirestore,
  getFirestoreFunction as default
}