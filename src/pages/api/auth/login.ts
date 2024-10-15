import prisma from '@/lib/prisma';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (!existingUser) return res.status(404).json({ error: 'User not found' });
      if (!existingUser.password) return res.status(401).json({ error: 'User has no password' });
      const isPasswordValid = compare(password, existingUser.password);
      if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });
      const token = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_SECRET!, {
        expiresIn: '7d',
      });
      res.status(200).json({ token, success: true });
    } catch (error: any) {
      console.log('error', error);
      res.status(500).json({ error: error.message, success: false });
    }
  }
}
