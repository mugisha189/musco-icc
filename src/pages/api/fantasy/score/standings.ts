import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      let season = req.query.season as string | undefined;
      let seasonId = req.query.seasonId as string | undefined;
      console.log('query season', season);
      if (!season) {
        const res = await prisma.season.findFirst({
          where: {
            status: 'ACTIVE',
          },
        });
        season = res?.name;
        seasonId = res?.id;
      }
      console.log('season', season);
      if (!season) return res.status(404).json({ error: 'Season not found' });
      const usersWithPredictions = await prisma.user.findMany({
        where: {
          UserPrediction: {
            some: {
              seasonId: seasonId,
            },
          },
        },
        include: {
          UserPrediction: true,
        },
      });
      // calculate user score of the sum of predictions
      const standings = usersWithPredictions.map((user) => {
        const score = user.UserPrediction.reduce((acc, prediction) => {
          return acc + prediction.points;
        }, 0);
        // ! Don't remove type for consistency btn backend and frontend
        const standing = {
          user_id: user.id,
          name: user.name,
          mis_id: user.mis_id,
          firstName: user.firstName,
          lastName: user.lastName,
          matchesPredicted: user.UserPrediction.filter((pre) => pre.status === 'MARKED').length,
          score,
        };
        return standing;
      });
      const sortedStandings = standings.sort((a, b) => b.score - a.score);
      res.status(200).json({ data: sortedStandings });
    } catch (error: any) {
      console.log('error', error);
      res.status(500).json({ error: error.message });
    }
  }
}
