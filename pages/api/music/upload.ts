import type { NextApiRequest, NextApiResponse } from 'next'

import { database } from './../../../config/firebase'
import { Storage } from '@google-cloud/storage'
import multer from 'multer'

const upload = multer()

const storage = new Storage({
  projectId: 'fir-authenticationstudy',
  keyFilename: './authenticationstudy-a0ca37e7dc08.json'
})
const bucketName = 'testdevelopment.xyz'
const bucket = storage.bucket(bucketName)

function initMiddleware(middleware: any) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
          if (result instanceof Error) {
              return reject(result);
          }
          return resolve(result);
      });
  });
}

const multerAny = initMiddleware(
  upload.any()
)

type NextApiRequestWithFormData = NextApiRequest & {
  files: any[],
}

type BlobCorrected = Blob & {
  originalname: string,
  buffer: Buffer,
}

export const config = {
  api: {
      bodyParser: false,
  },
}

export default async (req: NextApiRequestWithFormData, res: NextApiResponse) => {
  await multerAny(req, res);

  // This operation expects a single file upload. Edit as needed.
  if (!req.files?.length || req.files.length > 1) {
      res.statusCode = 400;
      res.end();
      return;
  }
  const blob: BlobCorrected = req.files[0];

  const randomString = String(Math.random() * Math.random())
  const filename = `${randomString}-${blob.originalname}`
  const bucketFile = bucket.file(filename)

  return await bucketFile.save(blob.buffer)
    .then(async (response) => {
      console.log('response')

      await database.collection('Musics').doc()
        .set({
          path: `http://testdevelopment.xyz/${filename}`,
          filename: blob.originalname
        })
        .then(response => {
          return res.status(201).json({
            ok: 'ok'
          })
        })
    })
    .catch(error => {
      console.error(error)
    })
}
