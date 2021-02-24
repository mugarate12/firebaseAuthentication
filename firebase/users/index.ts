import { handleResponse, FirebaseFunctionError } from './../../config/firebaseResponse'
import { auth, firebaseModule } from './../../config/firebase'

export async function createUserWithEmailAndPassword(
  email: string,
  password: string
) {
  try {
    return await auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        return handleResponse({
          message: 'User created sucessful',
          data: {
            userUid: user.user.uid
          }
        })
      })
      .catch(error => {
        throw new FirebaseFunctionError(error.code, error.message)
      })
  } catch (error) {
    throw new FirebaseFunctionError(error.code, error.message)
  }
}

export async function signInWithEmailAndPassword(
  email: string,
  password:string
) {
  try {
    return await auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        return handleResponse({
          message: 'user logged!',
          data: {
            userUid: user.user.uid
          }
        })
      })
      .catch(error => {
        throw new FirebaseFunctionError(error.code, error.message)
      })
  } catch (error) {
    throw new FirebaseFunctionError(error.code, error.message)
  }
}

export async function signInWithGoogle() {
  const provider = new firebaseModule.auth.GoogleAuthProvider()

  return await auth
    .signInWithPopup(provider)
    .then((result) => {
      const credential = result.credential
      const user = result.user
      const uid = user.uid

      return handleResponse({
        message: 'user logged!',
        data: {
          userUid: uid
        }
      })
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential

      throw new FirebaseFunctionError(errorCode, errorMessage)
    })
}