import { getUserFromReq } from '@/lib/api';
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const user = await getUserFromReq(req, res);
      if (!user) return res.status(404).json({ error: 'User not found' });
      let season = req.query.season as string | undefined;
      console.log('query season', season);
      if (!season) {
        const res = await prisma.season.findFirst({
          where: {
            status: 'ACTIVE',
          },
        });
        season = res?.name;
      }
      if (!season) return res.status(404).json({ error: 'Season not found' });
      const score = await prisma.userPrediction.aggregate({
        _sum: {
          points: true,
        },
        where: {
          seasonId: season,
        },
      });
      res.status(200).json({ data: score });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
