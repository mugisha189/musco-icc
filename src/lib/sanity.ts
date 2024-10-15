import { getDataSetFromYear } from '@/utils/funcs/func1';
import { ClientConfig, createClient } from 'next-sanity';

export const sanityConfig: ClientConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: typeof document !== 'undefined' && process.env.NODE_ENV === 'production',
  apiVersion: '2022-11-16',
  token: process.env.SANITY_API_TOKEN,
};

export const sanityClient = createClient(sanityConfig);
export const seasonClient = (season: string) => createClient({ ...sanityConfig, dataset: getDataSetFromYear(season) });
