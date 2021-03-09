import type { NextApiRequest, NextApiResponse } from 'next'
import { Storage } from '@google-cloud/storage'
import path from 'path'

// import './../../../authenticationstudy-a0ca37e7dc08.json'

const storage = new Storage({
  projectId: 'fir-authenticationstudy',
  keyFilename: './authenticationstudy-a0ca37e7dc08.json'
})

// import './../../../static/playermusic/actualMusic.jpg'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const bucketName = 'testdevelopment.xyz'
  const bucket = storage.bucket(bucketName)

  // console.log(path.resolve(__dirname, '..', '..', '..', 'static', 'playermusic', './actualMusic.jpg'))

  const file = bucket.file('prod.jpg')
  await file.download({
    destination: './static/playermusic/actualMusic'
  })
    .then(data => {
      console.log('data', data)
    })


  // console.log(file)

  return res.status(200).json({ok: 'ok!'})
}
