import { database } from './../../config/firebase'
import { FirebaseFunctionError, handleResponse } from './../../config/firebaseResponse'

const COLLECTION_NAME = 'Producer'

export async function createProducer(
  userUid: string
) {
  try {
    return await database.collection(COLLECTION_NAME).doc(userUid)
      .set({
        example: 'example'
      })
      .then(result => {
        return handleResponse({
          message: 'producer data created sucessful'
        })
      })
  } catch (error) {
    throw new FirebaseFunctionError(error.code, error.message)
  }
}

export async function getProducer(
  userUid: string
) {
  try {
    return await database.collection(COLLECTION_NAME).doc(userUid)
      .get()
      .then(snapshot => {
        const data = snapshot.data()
        console.log('data', data)

        return handleResponse({
          message: 'get producer user informations sucessful',
          data
        })
      })
  } catch (error) {
    throw new FirebaseFunctionError(error.code, error.message)
  }
}
