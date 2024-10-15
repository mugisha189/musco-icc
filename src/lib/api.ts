import { NextApiRequest, NextApiResponse } from 'next';
import prisma from './prisma';
import jwt from 'jsonwebtoken';

export const getUserFromReq = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization || req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
  if (!decoded) return res.status(401).json({ error: 'Unauthorized' });
  const user = await prisma.user.findFirst({ where: { id: decoded?.id } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  return user;
  // if (!decoded) return res.status(401).json({ error: 'Unauthorized' });
  // const user = await prisma.user.findFirst({ where: { email: decoded?.email } });
  // if (!user) return res.status(404).json({ error: 'User not found' });
  // return user;
};
