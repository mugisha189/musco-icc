import prisma from '@/lib/prisma';
import { botApi } from '@/utils/funcs/fetch';
import { calculateUserPoints } from '@/utils/funcs/predictor';
import { Match } from '@/utils/types/types1';
import { UserPrediction } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

// export const POSSIBLE_DEADLINE = new Date('2024-02-19T15:30:14.903+00:00'); // This to capture the deadline for the match

// ! This is the method specified in sanity webhook. Be careful when changing it and query below is returning the match object (one in sanity webhook)
/* 
 {_id,title,description,date,"homeTeam": homeTeam->{
        _id,
        name,
    },
    "awayTeam": awayTeam->{
        _id,
        name,
    },
    status,stats,fantasy,category,
} */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ! This is the method specified in sanity webhook. Be careful when changing it
  // ! Also change route name can cause error in the webhook
  // ! In sanity URL, the route name is specified as /api/fantasy/score/update-score. but can change
  // * I used ngrok to expose my localhost to the internet 😉
  if (req.method === 'PUT') {
    try {
      const { _id, status } = req.body as Match;

      //* If match is not finished, don't update the score
      if (status.status !== 'FT') {
        res.status(200).json({ message: 'Match not finished' });
        return;
      }
      const season = await prisma.season.findFirst({
        where: {
          status: 'ACTIVE',
        },
      });
      const seasonId = season?.id;
      if (!seasonId) return res.status(404).json({ message: 'No active season found' }); // * If no active season found, return 404
      // * Get all userPredictions for the match which are not marked
      const userPredictions = await prisma.userPrediction.findMany({
        where: {
          matchId: _id,
          status: 'NOT_MARKED',
        },
      });

      const userPredictionsWithNewPoints: UserPrediction[] = [];

      //* loop through the userPredictions and update the score (points) of each user
      userPredictions.forEach(async (userPrediction) => {
        console.log('=== Calculating user points ===', userPrediction.id);
        // TODO: uncomment before updating if you want to check if user changed the score after the deadline
        // if (userPrediction.updatedAt && userPrediction.updatedAt > POSSIBLE_DEADLINE) {
        //   console.log("Score don't count. You changed the score after the deadline");
        //   await prisma.userPrediction.update({
        //     where: { id: userPrediction.id },
        //     data: {
        //       points: 0,
        //       status: 'MARKED',
        //       reason: {
        //         reason: 'You changed the score after the deadline. Cheating is not allowed.',
        //         type: 'CHEATING',
        //       },
        //     },
        //   });
        //   return;
        // }
        const finalPoint = calculateUserPoints(userPrediction, req.body as Match);
        userPredictionsWithNewPoints.push({ ...userPrediction, points: finalPoint.userPoints, status: 'MARKED' });
        await prisma.userPrediction.update({
          where: { id: userPrediction.id },
          data: {
            points: finalPoint.userPoints,
            status: 'MARKED',
          },
        });
      });

      console.log('=== Start updating standings ===');
      // * Making standings (userOverallScore).
      // first get all users with predictions for the active season
      const usersWithPredictions = await prisma.user.findMany({
        where: {
          UserPrediction: {
            some: {
              seasonId: season?.id,
            },
          },
        },
        include: {
          UserPrediction: true,
        },
      });

      console.log('===== Making temporary standings ======');
      // calculate user score of the sum of predictions
      const standings = usersWithPredictions.map((user) => {
        // To get the new prediction with points
        const userNewPrediction = userPredictionsWithNewPoints.find((pre) => pre.userId === user.id);
        const withNewPrediction = user.UserPrediction.map((newPrediction) => {
          if (newPrediction.id === userNewPrediction?.id) {
            return userNewPrediction;
          }
          return newPrediction;
        });
        const score = withNewPrediction.reduce((acc, prediction) => {
          return acc + prediction.points;
        }, 0);
        const standing = {
          user_id: user.id,
          name: user.name,
          mis_id: user.mis_id,
          firstName: user.firstName,
          lastName: user.lastName,
          matchesPredicted: withNewPrediction.filter((pre) => pre.status === 'MARKED').length,
          score,
        };
        return standing;
      });
      const sortedStandings = standings.sort((a, b) => b.score - a.score);

      console.log('==== Updating userOverallScore ====');
      // * Update the userOverallScore
      // baseUrl is the url of the nextjs app remove / at last if url has it
      const thisBaseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') || 'https://rca-icc.vercel.app';
      console.log('thisBaseUrl', thisBaseUrl);
      await fetch(`${thisBaseUrl}/api/fantasy/score/overall`, {
        method: 'PUT',
        body: JSON.stringify({ standings: sortedStandings, seasonId, _id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("=== Standings updating. Won't wait for it ===");
      // send update to slack
      const relatedSchedule = await prisma.matchSchedule.findFirst({
        where: {
          matchId: _id,
          status: 'COMPLETED',
        },
      });
      if (relatedSchedule) {
        botApi.post('/api/fantasy/match-updates', { standings: sortedStandings, match: req.body as Match });
        await prisma.matchSchedule.delete({
          where: {
            id: relatedSchedule.id,
          },
        });
      }
      res.status(200).json({ message: 'Score updated', standings: sortedStandings });
    } catch (error: any) {
      console.error('error', error);
      res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'GET') {
    try {
      res.status(200).json({ message: 'Score update webhook' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
