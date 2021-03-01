import { database } from './../../config/firebase'
import { FirebaseFunctionError, handleResponse } from './../../config/firebaseResponse'

const COLLECTION_NAME = 'Profile'

export default class Profiles {
  public create = async (
    userUid: string,
    name: string,
    contact: string,
    username: string
  ) => {
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

  public get = async (userUid: string) => {
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
}
