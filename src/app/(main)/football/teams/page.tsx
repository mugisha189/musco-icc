'use client';
import { useSanity } from '@/contexts/SanityProvider';
import { useEffect, useState } from 'react';
import TeamCard from '@/components/constants/TeamCard';
import MainLayout from '@/layouts/MainLayout';
import { teamsFootQuery } from '@/lib/queries';
import { Team } from '@/utils/types/types1';

const TeamsIndex = () => {
  const { client } = useSanity();
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    if (!client) return;
    const getTeams = async () => {
      const teams = await client.fetch(teamsFootQuery);
      setTeams(teams);
    };
    getTeams();
  }, [client]);
  const officialTeams = teams.filter((team) => team.isOfficial === true);
  return (
    <MainLayout title="Football - Teams">
      <h1 className=" text-lg font-semibold px-3">Football Teams</h1>
      <div className="w-full h-fit grid desktop:flex flex-wrap desktop:gap-1 gap-3 md:grid-cols-2">
        {officialTeams.map((team) => (
          <TeamCard key={team._id} {...team} />
        ))}
      </div>
    </MainLayout>
  );
};

export default TeamsIndex;
