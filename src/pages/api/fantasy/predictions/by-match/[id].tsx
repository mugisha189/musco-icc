import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
// import { POSSIBLE_DEADLINE } from '../../score/update-score';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;
  if (!id) return res.status(400).json({ message: 'Match id is required' });
  if (req.method === 'GET') {
    try {
      const predictions = await prisma.userPrediction.findMany({
        where: {
          matchId: id as string,
          updatedAt: {
            gte: new Date(new Date('2024-02-19T16:00:14.903+00:00')),
          },
          //   prediction: {
          //     manOfTheMatch: '64706285-9e6c-47fb-83af-180f42d4bf70',
          //     firstTeamToScore: '',
          //     homeScore: 9,
          //     awayScore: 39,
          //     highestScoringPlayer: '64706285-9e6c-47fb-83af-180f42d4bf70',
          //   },
        },
        include: {
          user: true,
        },
      });
      //   if (predictions[0].updatedAt && predictions[0].updatedAt > POSSIBLE_DEADLINE) {
      //     console.log('Deadline has passed');
      //   }
      res.status(200).json({ predictions, message: 'Success' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
