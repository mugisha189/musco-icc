import prisma from '@/lib/prisma';
import { OldStanding } from '@/utils/types/fantasy.type';
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
      const score = await prisma.userOverallScore.findMany({
        where: {
          seasonId: seasonId,
        },
        include: {
          user: true,
        },
      });
      const sortedScore = score.sort((a, b) => b.score - a.score);
      res.status(200).json({ data: sortedScore });
    } catch (error: any) {
      console.log('error', error);
      res.status(500).json({ error: error.message });
    }
  }

  // update overall score
  if (req.method === 'PUT') {
    const { standings, seasonId, _id } = req.body as { standings: OldStanding[]; seasonId: string; _id: string };

    try {
      standings.forEach(async (standing, i) => {
        const rank = i + 1;
        const userOverallScore = await prisma.userOverallScore.findFirst({
          where: {
            userId: standing.user_id,
            seasonId,
          },
        });
        const isTheSameMatch = userOverallScore?.lastMatchId === _id;
        if (isTheSameMatch) return; // * If the match is already updated, don't update again

        if (userOverallScore) {
          console.log('=== Updating userOverallScore ===', standing.matchesPredicted);
          await prisma.userOverallScore.update({
            where: {
              id: userOverallScore.id,
            },
            data: {
              score: standing.score,
              matchesPredicted: standing.matchesPredicted,
              currentPosition: rank,
              lastPosition: userOverallScore.currentPosition || rank,
              lastMatchId: _id,
            },
          });
        } else {
          console.log('=== Creating new userOverallScore ===', standing.matchesPredicted);
          await prisma.userOverallScore.create({
            data: {
              score: standing.score,
              matchesPredicted: standing.matchesPredicted,
              currentPosition: rank,
              lastPosition: rank,
              lastMatchId: _id,
              seasonId,
              userId: standing.user_id,
            },
          });
        }
      });
      res.status(200).json({ data: standings });
    } catch (error: any) {
      console.log('error', error);
      res.status(500).json({ error: error.message });
    }
  }
}
