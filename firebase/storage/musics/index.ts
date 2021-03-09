import {
  storage
} from './../../../config/firebase'

import {
  FirebaseFunctionError,
  handleResponse
} from './../../../config/firebaseResponse'

import path from 'path'
import { Storage } from '@google-cloud/storage'
// // import './../../../authenticationstudy-a0ca37e7dc08.json'

// const storageGoogleCloud = new Storage({
//   projectId: 'fir-authenticationstudy',
//   // keyFile: './../../../authenticationstudy-a0ca37e7dc08.json',
//   keyFilename: path.join(__dirname, '..', '..', '..', './authenticationstudy-a0ca37e7dc08.json')
// })

// const bucketName = 'testdevelopment.xyz'
// const bucket = storageGoogleCloud.bucket(bucketName)

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

  public getCloudStorage = async () => {
    // const storageGoogleCloud = new Storage({
    //   projectId: 'fir-authenticationstudy',
    //   // keyFile: './../../../authenticationstudy-a0ca37e7dc08.json',
    //   keyFilename: path.join(__dirname, '..', '..', '..', './authenticationstudy-a0ca37e7dc08.json')
    // })
    
    // const bucketName = 'testdevelopment.xyz'
    // const bucket = storageGoogleCloud.bucket(bucketName)
    // const file = bucket.file('prod.jpg')

    // console.log(file)
  }
}