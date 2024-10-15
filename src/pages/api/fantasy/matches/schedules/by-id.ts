import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      const matchSchedule = await prisma.matchSchedule.findFirst({
        where: {
          id: id as string,
        },
      });
      res.status(200).json({ data: matchSchedule, message: 'Schedule fetched' });
    } catch (error: any) {
      console.log('Error', error);
      res.status(500).json({ message: error?.message, error });
    }
  }
}
