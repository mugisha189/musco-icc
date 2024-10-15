import { seasonClient } from '@/lib/sanity';
import { NextApiRequest, NextApiResponse } from 'next';

// * This was to update data in sanity at the same time.
//! This is used Once
//! Operation is done
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { season } = req.query;
  console.log('season', season);
  const client = seasonClient((season as string) ?? '2024');
  try {
    // const teams = await client.fetch('*[_type == "team"]');
    // // ! This was used
    // ! Don't uncomment unless you want to update the data again or you know well what you are doing
    // for (const match of teams) {
    //   await client
    //     .patch(match._id) // Document ID to patch
    //     .set({ gender: 'male' }) // Set new gender
    //     .commit(); // Perform the update
    // }

    const updated = await client.fetch('*[_type == "team"]');
    res.status(200).json({ updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
