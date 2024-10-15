import { getUserFromReq } from '@/lib/api';
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // get my prediction by match
  if (req.method === 'GET') {
    try {
      const { matchId } = req.query;
      if (!matchId) return res.status(400).json({ message: 'Match id is required' });
      const user = await getUserFromReq(req, res);
      if (!user) return res.status(404).json({ message: 'User not found' });
      // get user prediction
      const userPrediction = await prisma.userPrediction.findFirst({
        where: {
          matchId: matchId as string,
          userId: user.id,
        },
      });
      res.status(200).json({ data: userPrediction });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
