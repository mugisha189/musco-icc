import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      //
      res.status(201).json({ success: true, message: 'Users imported successfully', data: [] });
    } catch (error: any) {
      console.log('error', error);
      res.status(500).json({ error: error.message, success: false });
    }
  }
}
