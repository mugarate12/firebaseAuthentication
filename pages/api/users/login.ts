import { NextApiRequest, NextApiResponse } from 'next'

import errorHandler from './../../../config/apiHandleError'
import firebase from './../../../config/firebase'

export default async function LoginUser(req: NextApiRequest, res: NextApiResponse) {
  const { email, password} = req.body

  if (req.method !== 'POST') {
    errorHandler(406, 'Invalid method', 'Route only can accept POST method', res)
  }

  return await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      return res.status(200).json({
        sucess: 'Usuário logado com sucesso!',
        userUid: user.user.uid
      })
    })
    .catch(error => {
      return errorHandler(406, error.code, error.message, res)
    })
}