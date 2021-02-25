import { database } from './../../config/firebase'
import { FirebaseFunctionError, handleResponse } from './../../config/firebaseResponse'

const COLLECTION_NAME = 'Profile'

export async function createProfile(
  userUid: string,
  name: string,
  contact: string,
  username: string
) {
  try {
    return await database.collection(COLLECTION_NAME).doc(userUid)
      .set({
        name,
        contact,
        username
      })
      .then(result => {
        return handleResponse({
          message: 'Profile created sucessful'
        })
      })
  } catch (error) {
    throw new FirebaseFunctionError(error.code, error.message)
  }
}

export async function getUserProfile(
  userUid: string
) {
  try {
    return await database.collection(COLLECTION_NAME).doc(userUid)
      .get()
      .then(snapshot => {
        const data = snapshot.data()

        return handleResponse({
          message: 'get user profile sucessful',
          data: data
        })
      })
  } catch (error) {
    throw new FirebaseFunctionError(error.code, error.message)
  }
}
