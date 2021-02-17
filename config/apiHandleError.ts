import { NextApiResponse } from 'next'

export default function errorHandler(status: number, name: string, message: string, res: NextApiResponse) {
  return res.status(status).json({
    error: {
      name,
      message
    }
  })
}
