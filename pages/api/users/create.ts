import { NextApiRequest, NextApiResponse } from 'next'

import firebase from './../../../config/firebase'

// POST METHOD
export default async function CreateUser(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body

  if (req.method !== 'POST') {
    return res.status(406).json({error: {
      name: 'Invalid method',
      message: 'Route only can accept POST method'
    }})
  }

  return await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      return res.status(201).json({
        sucess: 'User created sucessful'
      })
    })
    .catch(error => {
      return res.status(406).json({error: {
        name: error.code,
        message: error.message
      }})
    })
}