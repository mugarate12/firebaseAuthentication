import { handleResponse, FirebaseFunctionError } from './../../config/firebaseResponse'
import { auth, firebaseModule } from './../../config/firebase'

export default class Users {
  public createUserWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
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

  public signInWithEmailAndPassword = async (
    email: string,
    password:string
  ) => {
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

  public signInWithGoogle = async () => {
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

  public signInWithFacebook = async () => {
    const provider = new firebaseModule.auth.FacebookAuthProvider()

    return await auth
      .signInWithPopup(provider)
      .then(result => {
        /** @type {firebase.auth.OAuthCredential} */
        const credential = result.credential

        // The signed-in user info.
        const user = result.user
        const uid = user.uid

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // const accessToken = credential.accessToken

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
}
