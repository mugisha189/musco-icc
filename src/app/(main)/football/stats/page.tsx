'use client';
import { useSanity } from '@/contexts/SanityProvider';
import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppProvider';
import MainLayout from '@/layouts/MainLayout';
import { mixArray, removeDuplicates } from '@/utils/funcs';
import { PRankeAble, rankPlayers } from '@/utils/funcs/func1';
import useGender from '@/hooks/useGender';
import GenderSwitcher from '@/components/shared/GenderSwitcher';

const StatsIndex = () => {
  const { client } = useSanity();
  const { players, getPlayers } = useApp();
  // make stats state with goals and assists which are sets
  const [stats, setStats] = useState<{
    goals: Set<PRankeAble>;
    assists: Set<PRankeAble>;
  }>({
    goals: new Set(),
    assists: new Set(),
  });
  const [footPlayers, setFootPlayers] = useGender(mixArray(players?.football!));

  useEffect(() => {
    if (players && players.football.length > 0) {
      const len = footPlayers.length;
      const withMostGoals = footPlayers?.slice(0, len).sort((a, b) => (b?.goals ?? 0) - (a?.goals ?? 0));
      const withMostAssists = footPlayers
        ?.slice(0, len)
        .sort((a, b) => ((b.footballAssists ?? 0) - (a.footballAssists ?? 0)) as any);

      const rankedWithGoals = rankPlayers(withMostGoals, 'goals');
      const rankedWithAssists = rankPlayers(withMostAssists, 'footballAssists');
      // set stats
      setStats({
        goals: new Set(removeDuplicates(rankedWithGoals)),
        assists: new Set(removeDuplicates(rankedWithAssists)),
      });
    }
  }, [footPlayers, players]);

  useEffect(() => {
    if (!players || players.football.length === 0) {
      getPlayers!(client);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  return (
    <MainLayout title="Football - Stats">
      <GenderSwitcher onChange={setFootPlayers} className=" max-w-md mx-auto w-full" />
      <div className="p-3 flex flex-col w-full gap-y-2">
        <h3 className=" px-2 font-semibold text-lg mt-5">Goals</h3>
        {Array.from(stats.goals)
          ?.slice(0, 5)
          ?.map((player, i) => {
            return (
              <div key={i} className="w-full border-b-2 border-gray  flex  gap-2 mt-5 justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-bold px-2">{player.rank}.</span>
                  <p className="text-sm font-bold">{player.fullName ?? player.displayName}</p>
                </div>
                <div className=" bg-gray w-[30px] h-6 text-slate-700 rounded-md text-center">
                  <p className=" ">{player.goals ?? 0}</p>
                </div>
              </div>
            );
          })}
        <h3 className=" px-2 font-semibold text-lg mt-5">Assists</h3>
        {Array.from(stats.assists)
          ?.slice(0, 5)
          ?.map((player, i) => {
            return (
              <div key={i} className="w-full border-b-2 border-gray  flex  gap-2 mt-5 justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-bold px-2">{player.rank}.</span>
                  <p className="text-sm font-bold">{player.fullName ?? player.displayName}</p>
                </div>
                <div className=" bg-gray w-[30px] h-6 text-slate-700 rounded-md text-center">
                  <p className=" ">{player.footballAssists ?? 0}</p>
                </div>
              </div>
            );
          })}
      </div>
    </MainLayout>
  );
};

export default StatsIndex;
