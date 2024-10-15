'use client';
import GenderSwitcher from '@/components/shared/GenderSwitcher';
import { useSanity } from '@/contexts/SanityProvider';
import useGender from '@/hooks/useGender';
import React from 'react';
import PlayerCard from '@/components/constants/PlayerCard';
import MainLayout from '@/layouts/MainLayout';
import { playersVolleyQuery } from '@/lib/queries';
import { Team } from '@/utils/types/types1';

const PlayersBaccoIndex = () => {
  const { client } = useSanity();
  const [teamPlayers, setTeamPlayers, { setData }] = useGender<Team>([]);

  React.useEffect(() => {
    if (!client) return;
    const getPlayers = async () => {
      const teamPlayers = await client.fetch<Team[]>(playersVolleyQuery);
      setData(teamPlayers);
    };
    getPlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  return (
    <MainLayout title="Volleyball - Players">
      <div className="p-3 gap-y-3 flex flex-col items-start">
        <GenderSwitcher onChange={setTeamPlayers} className=" max-w-md mx-auto w-full" />
        <h1 className="px-3 font-semibold">Players</h1>
        {/* <div className='flex gap-3 flex-wrap w-full mt-3'>
					{players.map((player) => (
						<PlayerCard key={player._id} {...player} />
					))}
				</div> */}
        {teamPlayers.map((team) => (
          <div key={team._id}>
            <h1 className="px-3 font-semibold my-3">{team.name}</h1>
            <div className="flex gap-3 flex-wrap w-full mt-3">
              {team.players.map((player, i) => (
                <PlayerCard key={i} {...player} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default PlayersBaccoIndex;
