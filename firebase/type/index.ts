import { database } from './../../config/firebase'
import { FirebaseFunctionError, handleResponse } from './../../config/firebaseResponse'

const COLLECTION_NAME = 'Type'

export async function createType(
  userUid: string,
  type: string
) {
  try {
    return await database.collection(COLLECTION_NAME).doc(userUid)
      .set({
        perfil: type
      })
      .then(result => {
        return handleResponse({
          message: 'Type created sucessful',
        })
      })
      .catch(error => {
        throw new FirebaseFunctionError(error.code, error.message)
      })
  } catch (error) {
    throw new FirebaseFunctionError(error.code, error.message)
  }
}

export async function getUserType(
  userUid: string
) {
  try {
    return await database.collection(COLLECTION_NAME).doc(userUid)
      .get()
      .then(snapshot => {
        const data = snapshot.data()

        return handleResponse({
          message: 'get user type sucessful',
          data: {
            type: data.perfil
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
