import {
  storage
} from './../../../config/firebase'

import {
  FirebaseFunctionError,
  handleResponse
} from './../../../config/firebaseResponse'

export default class Musics {
  public upload = async (
    filename: string,
    musicFile: File
  ) => {
    try {
      const filenameRef = storage.child(`/musics/${filename}`)

      return filenameRef.put(musicFile)
        .then(snapshot => {
          return handleResponse({
            message: 'music uploaded'
          })
        })
    } catch (error) {
      throw new FirebaseFunctionError(error.name, error.message)
    }
  }

  public index = async () => {
    try {
      const listRef = storage.child('/musics')

      return await listRef.listAll()
        .then(response => {
          return handleResponse({
            message: 'list of musics',
            data: {
              prefixes: response.prefixes,
              items: response.items
            }
          })
        })
    } catch (error) {
      throw new FirebaseFunctionError(error.name, error.message)
    }
  }

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
}