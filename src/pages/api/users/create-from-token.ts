import { NextApiRequest, NextApiResponse } from 'next';
import { UserProfile } from '@/utils/types/user.type';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { token } = req.body;
      const response = await fetch('http://194.163.167.131:6543/api/v1/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const _res = await response.json();
      console.log('res', _res.data.message);
      const data = _res.data;
      const mis_user = data.user;
      const mis_person: UserProfile = data.person;

      const existing_user = await prisma.user.findFirst({
        where: {
          email: mis_person.email,
        },
      });
      console.log('existing_user', existing_user);

      if (existing_user) {
        res.status(200).json(existing_user);
      } else {
        const p_data = await prisma.user.create({
          data: {
            name: mis_person.firstName + ' ' + mis_person.lastName,
            email: mis_person.email,
            mis_id: mis_user.id,
            firstName: mis_person.firstName,
            lastName: mis_person.lastName,
          },
        });
        console.log('user created', p_data);
        res.status(201).json(p_data);
      }
    } catch (error: any) {
      console.log('error', error);
      res.status(500).json({ error: error.message });
    }
  }

  // if (req.method === 'GET') {
  //   try {
  //     const {token} = req.query;
  //     const response = await fetch('http://194.163.167.131:6543/api/v1/auth/profile', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const _res = await response.json();
  //     console.log('res', _res.data.message);
  //     const data = _res.data;
  //     const mis_user = data.user;
  //     const mis_person: UserProfile = data.person;

  // }
}
