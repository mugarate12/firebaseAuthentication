import {
  storage,
  database
} from './../../../config/firebase'

import {
  FirebaseFunctionError,
  handleResponse
} from './../../../config/firebaseResponse'

import api from './../../../config/axios'

interface MusicsListInterface {
  musicName: string,
  storageReference: string
}

const COLLECTION_NAME = 'Musics'

export default class Musics {
  public get = async (
    urlData: string
  ) => {
    try {
      return await storage.child(urlData)
        .getDownloadURL()
        .then(data => {
          return handleResponse({
            message: 'get music sucessful',
            data: {
              music: data
            }
          }) 
        })
    } catch (error) {
      throw new FirebaseFunctionError(error.name, error.message)
    }
  }

  public upload = async (
    music: File
  ) => {
    const data = new FormData()
    data.append('file', music)

    return await api.post('/api/music/upload', data)
      .then(response => {
        return handleResponse({
          message: 'upload sucessful!'
        })
      })
      .catch(error => {
        throw new FirebaseFunctionError(error.name, error.message)
      })
  }

  public index = async () => {
    return await database.collection(COLLECTION_NAME)
      .get()
      .then(snapshot => {
        let musicsArray: Array<MusicsListInterface> = []

        snapshot.forEach(doc => {
          const data = doc.data()

          musicsArray.push({
            musicName: data.filename,
            storageReference: data.path
          })
        })

        return handleResponse({
          message: 'get list of musics sucessful',
          data: {
            musics: musicsArray
          }
        })
      })
      .catch(error => {
        throw new FirebaseFunctionError(error.name, error.message)
      })
  }
}