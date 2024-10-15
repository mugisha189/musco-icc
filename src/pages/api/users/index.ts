import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // const data = await prisma.user.findMany();
      res.status(200).json({ message: 'user info are are confidential', data: [] });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  if (req.method === 'POST') {
    try {
      const { name, email, mis_id } = req.body;
      const data = await prisma.user.create({
        data: {
          name,
          email,
          mis_id,
        },
      });
      res.status(201).json(data);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
}
