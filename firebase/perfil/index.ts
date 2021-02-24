import { handleResponse, FirebaseFunctionError } from './../../config/firebaseResponse'
import { database } from './../../config/firebase'

export async function createPerfilType(
  userUid: string,
  type: string
) {
  try {
    return await database.collection('perfil').doc(userUid)
      .set({
        type: type
      })
      .then(result => {
        return handleResponse({
          message: 'perfil type created sucessful'
        })
      })
      .catch(error => {
        throw new FirebaseFunctionError(error.code, error.message)
      })
  } catch (error) {
    throw new FirebaseFunctionError(error.code, error.message)
  }
}

export async function getPerfilType(
  userUid: string
) {
  try {
    return await database.collection('perfil').doc(userUid)
      .get()
      .then(snapshot => {
        const data = snapshot.data()

        return handleResponse({
          message: 'get perfil type sucessful',
          data: {
            type: data.type
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