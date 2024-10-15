import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ error: 'Unauthorized' });
      const { id } = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          email: true,
          name: true,
          updatedAt: true,
          createdAt: true,
        },
      });
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.status(200).json({ user, success: true });
    } catch (error: any) {
      console.log('error', error);
      res.status(500).json({ error: error.message, success: false });
    }
  }
}
