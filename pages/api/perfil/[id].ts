import { NextApiRequest, NextApiResponse } from 'next'

import errorHandler from './../../../config/apiHandleError'
import { database } from './../../../config/firebase'

export default async function getPerfilType(req: NextApiRequest, res: NextApiResponse) {
  const { userUID } = req.query
  console.log(userUID)
  
  if (req.method !== 'GET') {
    errorHandler(406, 'Invalid method', 'Route only can accept POST method', res)
  }

  return await database.collection('perfil').doc(String(userUID))
    .get()
    .then(snapshot => {
      const data = snapshot.data()
      
      return res.status(200).json({
        type: data.tipo
      })
    })
    .catch(error => {
      return errorHandler(406, error.code, error.message, res)
    })
}