import { handleResponse } from './../../config/firebaseResponse'
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
          type: 'sucess',
          message: 'perfil type created sucessful'
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

export async function getPerfilType(
  userUid: string
) {
  try {
    return await database.collection('perfil').doc(userUid)
      .get()
      .then(snapshot => {
        const data = snapshot.data()

        return handleResponse({
          type: 'sucess',
          message: 'get perfil type sucessful',
          data: {
            type: data.type
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