import { handleResponse } from './../../config/firebaseResponse'
import { auth } from './../../config/firebase'

export async function createUserWithEmailAndPassword(
  email: string,
  password: string
) {
  try {
    return await auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        return handleResponse({
          type: 'sucess',
          message: 'User created sucessful',
          data: {
            userUid: user.user.uid
          }
        })
      })
      .catch(error => {
        return handleResponse({
          type: 'error',
          message: error.message,
          errorCode: error.code
        })
      })
  } catch (error) {
    return handleResponse({
      type: 'error',
      message: error.message,
      errorCode: error.code
    })
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
          type: 'sucess',
          message: 'user logged!',
          data: {
            userUid: user.user.uid
          }
        })
      })
      .catch(error => {
        return handleResponse({
          type: 'error',
          message: error.message,
          errorCode: error.code
        })
      })
  } catch (error) {
    return handleResponse({
      type: 'error',
      message: error.message,
      errorCode: error.code
    })
  }
}