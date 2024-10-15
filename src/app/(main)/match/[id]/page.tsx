import { fetchMatchByIdQuery } from '@/lib/queries';
import { seasonClient } from '@/lib/sanity';
import { BaseMetaProps } from '@/utils/types';
import { Match } from '@/utils/types/types1';
import React from 'react';
import MatchIndex from '.';
import { notFound } from 'next/navigation';

export const revalidate = 15;

const getMatch = async (id: string, season?: string) => {
  const match = await seasonClient(season ?? '2024')?.fetch(fetchMatchByIdQuery(id as string));
  return match[0];
};

export async function generateMetadata(props: BaseMetaProps) {
  const season = props.searchParams.season;
  const match: Match | null = await getMatch(props.params.id, season);
  return {
    title: `${match?.homeTeam?.name} vs ${match?.awayTeam?.name} - RCA-ICC`,
    description: `View all details of the match between ${match?.homeTeam?.name} vs ${match?.awayTeam?.name}`,
    openGraph: {
      type: 'website',
      images: [{ url: `/api/og?image=${match?.banner}`, alt: 'RCA-ICC', width: 800, height: 800 }],
      description: `View all details of the match between ${match?.homeTeam?.name} vs ${match?.awayTeam?.name}`,
      title: `${match?.homeTeam?.name} vs ${match?.awayTeam?.name} - RCA-ICC`,
    },
  };
}

const MatchPage = async (props: BaseMetaProps) => {
  const season = props.searchParams.season;
  const match: Match | null = await getMatch(props.params.id, season);
  if (!match) return notFound();
  return <MatchIndex match={match} />;
};

export default MatchPage;
