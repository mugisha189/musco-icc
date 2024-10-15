import { getUserFromReq } from '@/lib/api';
import prisma from '@/lib/prisma';
import { fetchMatchStatusQuery } from '@/lib/query2';
import { seasonClient } from '@/lib/sanity';
import { Match } from '@/utils/types/types1';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // const predictions = await prisma.userPrediction.findMany({
      //   include: {
      //     user: true,
      //   },
      // });
      res.status(200).json({ predictions: [] });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Create user prediction
  if (req.method === 'POST') {
    try {
      const { prediction: userPrediction, season } = req.body;
      // Game user
      const user = await getUserFromReq(req, res);
      if (!user) return res.status(404).json({ message: 'User not found' });
      if (!user?.isGamer) {
        // make sure user a gamer
        await prisma.user.update({
          where: { id: user?.id },
          data: { isGamer: true },
        });
      }
      let _seas = season;
      if (!season) {
        const activeSeason = await prisma.season.findFirst({
          where: { status: 'ACTIVE' },
        });
        if (!activeSeason) return res.status(404).json({ message: 'Active season not found' });
        _seas = activeSeason.name;
      }

      // find season
      const _season = await prisma.season.findFirst({
        where: { name: _seas },
      });
      if (!_season) return res.status(404).json({ message: 'Season not found' });
      // if season is inactive
      if (_season.status === 'INACTIVE') return res.status(404).json({ message: 'Season is inactive' });

      // verify match status
      if (!userPrediction?.matchId) return res.status(400).json({ message: 'Match id is required' });
      const matchStatus = await seasonClient(_season.name).fetch<Match[]>(
        fetchMatchStatusQuery(userPrediction.matchId),
      );
      const statusDisabled = !['NS', 'TBD'].includes(matchStatus[0]?.status?.status!);
      if (!matchStatus || matchStatus?.length === 0) return res.status(404).json({ message: 'Match not found' });
      if (matchStatus[0].status.status === 'PS') return res.status(400).json({ message: 'Match has been postponed' });
      if (statusDisabled) return res.status(400).json({ message: 'Match has already started' });
      if (new Date(matchStatus[0].date).getTime() < new Date().getTime())
        return res.status(400).json({ message: 'Match has already started' });

      // check if predicted in the same match
      const userPredictions = await prisma.userPrediction.findFirst({
        where: {
          userId: user.id,
          matchId: userPrediction.matchId,
        },
      });
      if (userPredictions) return res.status(400).json({ message: 'Match already predicted' });

      // Create user prediction
      const prediction = await prisma.userPrediction.create({
        data: {
          matchId: userPrediction.matchId,
          userId: user.id,
          seasonId: _season.id,
          prediction: {
            manOfTheMatch: userPrediction.manOfTheMatch,
            firstTeamToScore: userPrediction.firstTeamToScore,
            homeScore: userPrediction.homeScore,
            awayScore: userPrediction.awayScore,
            highestScoringPlayer: userPrediction.highestScoringPlayer,
          },
          matchCategory: userPrediction.matchCategory,
        },
      });
      res.status(201).json({ data: prediction });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  //* Update user prediction
  if (req.method === 'PUT') {
    try {
      const { prediction: userPrediction, season } = req.body;
      // Game user
      const user = await getUserFromReq(req, res);
      if (!user) return res.status(404).json({ message: 'User not found' });
      if (!user?.isGamer) {
        // make sure user a gamer
        await prisma.user.update({
          where: { id: user?.id },
          data: { isGamer: true },
        });
      }
      let _seas = season;
      if (!season) {
        const activeSeason = await prisma.season.findFirst({
          where: { status: 'ACTIVE' },
        });
        if (!activeSeason) return res.status(404).json({ message: 'Active season not found' });
        _seas = activeSeason.name;
      }

      // find season
      const _season = await prisma.season.findFirst({
        where: { name: _seas },
      });
      if (!_season) return res.status(404).json({ message: 'Season not found' });
      // if season is inactive
      if (_season.status === 'INACTIVE') return res.status(404).json({ message: 'Season is inactive' });

      // verify match status
      if (!userPrediction?.matchId) return res.status(400).json({ message: 'Match id is required' });
      const matchStatus = await seasonClient(_season.name).fetch<Match[]>(
        fetchMatchStatusQuery(userPrediction.matchId),
      );

      // validate match status
      const statusDisabled = !['NS', 'TBD'].includes(matchStatus[0]?.status?.status!);
      if (!matchStatus || matchStatus?.length === 0) return res.status(404).json({ message: 'Match not found' });
      if (statusDisabled) return res.status(400).json({ message: 'Match has already started' });
      if (new Date(matchStatus[0].date).getTime() < new Date().getTime())
        return res.status(400).json({ message: 'Match has already started' });

      // check if predicted in the same match
      const userPredictions = await prisma.userPrediction.findFirst({
        where: {
          userId: user.id,
          matchId: userPrediction.matchId,
        },
      });
      if (!userPredictions) return res.status(400).json({ message: 'Match not predicted' });

      // Update user prediction
      const prediction = await prisma.userPrediction.update({
        where: { id: userPredictions.id },
        data: {
          prediction: {
            manOfTheMatch: userPrediction.manOfTheMatch,
            firstTeamToScore: userPrediction.firstTeamToScore,
            homeScore: userPrediction.homeScore,
            awayScore: userPrediction.awayScore,
            highestScoringPlayer: userPrediction.highestScoringPlayer,
          },
        },
      });
      res.status(200).json({ data: prediction });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
