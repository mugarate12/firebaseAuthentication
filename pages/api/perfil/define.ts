import { error } from 'console'
import { NextApiRequest, NextApiResponse } from 'next'

import errorHandler from './../../../config/apiHandleError'
import { database } from './../../../config/firebase'

export default async function createPerfilType(req: NextApiRequest, res: NextApiResponse) {
  const { userUid, type } = req.body

  if (req.method !== 'POST') {
    errorHandler(406, 'Invalid method', 'Route only can accept POST method', res)
  }

  return await database.collection('perfil').doc(userUid)
    .set({
      tipo: type
    })
    .then(result => {
      console.log(result)

      return res.status(201).json({
        sucess: 'Perfil type created sucessful'
      })
    })
    .catch(error => {
      return errorHandler(406, error.code, error.message, res)
    })
}