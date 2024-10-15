import prisma from '@/lib/prisma';
import { botApi } from '@/utils/funcs/fetch';
import { Match } from '@/utils/types/types1';
import { MatchCategory } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const schedules = await prisma.matchSchedule.findMany({
        orderBy: {
          scheduledTime: 'asc',
        },
        where: {
          status: 'QUEUED',
        },
      });
      res.status(200).json({ data: schedules, message: 'Schedules fetched' });
    } catch (error: any) {
      console.log('Error', error);
      res.status(500).json({ message: error?.message, error });
    }
  }
  // initiated by sanity webhook
  // TODO: Knowing if the document webhook trigger is delete in order to delete the schedule
  if (req.method === 'POST') {
    try {
      const { _id, status, homeTeam, awayTeam, date, category, action } = req.body as Match & {
        action: 'create' | 'delete' | 'delete';
      };
      if (action === 'delete') {
        // Handle delete action
        const deleteResult = await prisma.matchSchedule.delete({
          where: { matchId: _id },
        });
        res.status(200).json({ message: 'Schedule deleted', data: deleteResult });
        return;
      }
      if (status.status === 'PS') {
        // delete the schedule
        const deleteResult = await prisma.matchSchedule.delete({
          where: { matchId: _id },
        });
        res.status(200).json({ message: 'Schedule deleted', data: deleteResult });
        return;
      }
      if (status.status !== 'NS') {
        res.status(200).json({ message: 'Match should have Not Started status' });
        return;
      }
      const matchSchedule = await prisma.matchSchedule.findFirst({
        where: {
          matchId: _id,
        },
      });
      if (matchSchedule) {
        // update the schedule
        const schedule = await prisma.matchSchedule.update({
          where: { matchId: _id },
          data: {
            homeTeam: homeTeam.name,
            awayTeam: awayTeam.name,
            scheduledTime: date,
            name: `${homeTeam.name} vs ${awayTeam.name}`,
            matchCategory: category as MatchCategory,
          },
        });
        console.log('Schedule updated', schedule);
        res.status(200).json({ data: schedule, message: 'Schedule updated' });
      } else {
        const schedule = await prisma.matchSchedule.create({
          data: {
            matchId: _id,
            homeTeam: homeTeam.name,
            awayTeam: awayTeam.name,
            scheduledTime: date,
            name: `${homeTeam.name} vs ${awayTeam.name}`,
            matchCategory: category as MatchCategory,
          },
        });
        console.log('Schedule created', schedule);
        // restart the matchCron on the server
        botApi.put('/system/reboot');
        res.status(200).json({ data: schedule, message: 'Schedule created' });
      }
    } catch (error: any) {
      console.log('Error', error);
      res.status(500).json({ message: error?.message, error });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      if (!id) return res.status(400).json({ message: 'id is required' });
      const deleteResult = await prisma.matchSchedule.delete({
        where: { id: id as string },
      });
      res.status(200).json({ message: 'Schedule deleted', data: deleteResult });
    } catch (error: any) {
      console.log('Error', error);
      res.status(500).json({ message: error?.message, error });
    }
  }

  // update status of the schedule
  if (req.method === 'PATCH') {
    try {
      const { id, status } = req.body;
      if (!id || !status) return res.status(400).json({ message: 'id and status are required' });
      const schedule = await prisma.matchSchedule.update({
        where: { id: id as string },
        data: {
          status: status,
        },
      });
      res.status(200).json({ message: 'Schedule status updated', data: schedule });
    } catch (error: any) {
      console.log('Error', error);
      res.status(500).json({ message: error?.message, error });
    }
  }
}
