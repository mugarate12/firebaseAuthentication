import * as functions from "firebase-functions"

export const createProfileDefaultFields = functions.firestore
  .document('/Profile/{documentID}')
  .onCreate((snap, context) => {
    const defaultInformations = {
      artisticName: 'your name'
    }

    return snap.ref.set({...defaultInformations}, { merge: true })
  })
