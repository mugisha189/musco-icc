import PlayerCard from '@/components/constants/PlayerCard';
import MainLayout from '@/layouts/MainLayout';
import { fetchTeamByIdQuery } from '@/lib/query1';
import { seasonClient } from '@/lib/sanity';
import { BaseMetaProps } from '@/utils/types';
import { Team } from '@/utils/types/types1';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

const getTeam = async (id: string, season?: string) => {
  try {
    const team = await seasonClient(season ?? '2024')?.fetch(fetchTeamByIdQuery(id as string));
    return team[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function generateMetadata(props: BaseMetaProps) {
  const season = props.searchParams.season;
  console.log('season comp', season);
  const team: Team | null = await getTeam(props.params.id, season);
  console.log('team comp', team);
  return {
    title: `${team?.name} - RCA-ICC`,
    description: `View all details about ${team?.name}`,
    openGraph: {
      type: 'website',
      images: [{ url: team?.logo || '/images/teamImage2.svg', alt: team?.name, width: 800, height: 800 }],
      description: `View all details about ${team?.name}`,
      title: `${team?.name} - RCA-ICC`,
    },
  };
}

const TeamPage = async (props: BaseMetaProps) => {
  const season = props.searchParams.season;
  const team: Team | null = await getTeam(props.params.id, season);

  if (!team) return notFound();

  return (
    <MainLayout isGeneral title={'Team' + ` - ${team?.name}`}>
      <h1 className=" text-center font-semibold text-lg">Team Details</h1>
      <div className=" w-full px-2 gap-y-3">
        <div className=" flex  border-2 border-gray rounded-md p-2 w-full gap-y-2 flex-col justify-center items-center ">
          <Image src={team?.logo || '/images/teamImage2.svg'} width={200} height={200} alt="" />
          <p className=" text-sm text-slate-500">Name: {team?.name}</p>
          <p className=" text-sm text-slate-500">Category: {team?.category}</p>
        </div>
        <h1 className="px-1 font-semibold text-lg mt-2">Stats</h1>
        <div className=" flex gap-2 flex-wrap  border-2 border-gray rounded-md p-2 mt-2">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-slate-500">Matches Played: {team?.stats?.matchesPlayed ?? 0}</p>
            <p className="text-sm text-slate-500">Wins: {team?.stats?.matchesWon ?? 0}</p>
            <p className="text-sm text-slate-500">Losses: {team?.stats?.matchesLost ?? 0}</p>
            <p className="text-sm text-slate-500">Draws: {team?.stats?.matchesDrawn ?? 'N/A'}</p>
            <p className="text-sm text-slate-500">Points: {team?.stats?.points ?? 0}</p>
            <p className="text-sm text-slate-500">Goal Scored: {team?.stats?.goalsScored ?? 'N/A'}</p>
            <p className="text-sm text-slate-500">Goal Conceded: {team?.stats?.goalsConceded ?? 'N/A'}</p>
          </div>
        </div>
        <h1 className="px-1 font-semibold text-lg mt-2">Players</h1>
        <div className=" flex gap-2 flex-wrap  border-2 border-gray rounded-md p-2 mt-2">
          <div className="flex gap-3 flex-wrap w-full mt-3">
            {team?.players.map((player, i) => <PlayerCard key={i} {...player} />)}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TeamPage;
