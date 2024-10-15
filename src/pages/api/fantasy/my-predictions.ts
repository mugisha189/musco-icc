import { getUserFromReq } from '@/lib/api';
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const user = await getUserFromReq(req, res);
      if (!user) return res.status(404).json({ message: 'User not found' });

      // check season
      let season = req.query.season as string | undefined;
      console.log('query season', season);
      if (!season) {
        const res = await prisma.season.findFirst({
          where: {
            status: 'ACTIVE',
          },
        });
        season = res?.id;
      }
      if (!season) return res.status(404).json({ message: 'Season not found' });

      const data = await prisma.userPrediction.findMany({
        where: { userId: user.id, seasonId: season },
      });
      return res.status(200).json({ data });
    } catch (error) {
      console.log('error', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
