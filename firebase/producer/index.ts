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
