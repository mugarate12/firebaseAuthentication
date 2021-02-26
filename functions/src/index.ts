import * as functions from "firebase-functions";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
})

exports.makeUpperCase = functions.firestore.document('perfil/{documentID}')
  .onCreate((snap, context) => {
    // dado original
    const original = snap.data().type

    // Access the parameter `{documentId}` with `context.params`
    functions.logger.log('log da variavel', context.params.documentId)

    const uppercase = original.toUpperCase()

    return snap.ref.set({type: uppercase}, {merge: true})
  })

exports.createProfileDefaultFields = functions.firestore.document('/Profile/{documentID}')
  .onCreate((snap, context) => {
    const defaultInformations = {
      artisticName: 'your name'
    }

    return snap.ref.set({...defaultInformations}, { merge: true })
  })
