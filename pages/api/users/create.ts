import { NextApiRequest, NextApiResponse } from 'next'

import errorHandler from './../../../config/apiHandleError'
import firebase from './../../../config/firebase'

// POST METHOD
export default async function CreateUser(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body

  if (req.method !== 'POST') {
    errorHandler(406, 'Invalid method', 'Route only can accept POST method', res)
  }

  return await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      return res.status(201).json({
        sucess: 'User created sucessful',
        userUid: user.user.uid
      })
    })
    .catch(error => {
      return errorHandler(406, error.code, error.message, res)
    })
}