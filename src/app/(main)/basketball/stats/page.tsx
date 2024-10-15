'use client';
import { useSanity } from '@/contexts/SanityProvider';
import useGender from '@/hooks/useGender';
import { useEffect, useState } from 'react';
import { useApp } from '../../../../contexts/AppProvider';
import MainLayout from '../../../../layouts/MainLayout';
import { mixArray, removeDuplicates } from '../../../../utils/funcs';
import { PRankeAble, rankPlayers } from '../../../../utils/funcs/func1';
import GenderSwitcher from '@/components/shared/GenderSwitcher';

const StatsIndex = () => {
  const { client } = useSanity();
  const { players, getPlayers } = useApp();
  const [stats, setStats] = useState<{
    points: Set<PRankeAble>;
    assists: Set<PRankeAble>;
    rebounds: Set<PRankeAble>;
  }>({
    points: new Set(),
    assists: new Set(),
    rebounds: new Set(),
  });
  const [basketPlayers, setBasketPlayers] = useGender(mixArray(players?.basketball!));

  useEffect(() => {
    if (players && players.basketball.length > 0) {
      // sort players by points, assists and rebounds
      const len = basketPlayers.length;
      const withMostPoints = basketPlayers?.slice(0, len).sort((a, b) => (b.points ?? 0) - (a.points ?? 0));
      const withMostAssists = basketPlayers
        ?.slice(0, len)
        .sort((a, b) => ((b.basketballAssists ?? 0) - (a.basketballAssists ?? 0)) as any);

      const withMostRebounds = basketPlayers
        ?.slice(0, len)
        .sort((a, b) => ((b.rebounds ?? 0) - (a.rebounds ?? 0)) as any);

      // add rank players
      const rankedWithPoints = rankPlayers(withMostPoints, 'points');
      const rankedWithAssists = rankPlayers(withMostAssists, 'basketballAssists');
      const rankedWithRebounds = rankPlayers(withMostRebounds, 'rebounds');

      // set stats removing duplicates
      setStats({
        points: new Set(removeDuplicates(rankedWithPoints)),
        assists: new Set(removeDuplicates(rankedWithAssists)),
        rebounds: new Set(removeDuplicates(rankedWithRebounds)),
      });
    }
  }, [basketPlayers, players]);

  useEffect(() => {
    if (!players || players.basketball.length === 0) {
      getPlayers!(client);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  return (
    <MainLayout title="Basketball - Stats">
      <div className="p-3 flex flex-col w-full gap-y-2">
        <GenderSwitcher onChange={setBasketPlayers} className=" max-w-md mx-auto w-full" />
        <h3 className=" px-2 font-semibold text-lg mt-5">Points</h3>
        {Array.from(stats.points)
          ?.slice(0, 5)
          ?.map((player, i) => {
            return (
              <div key={i} className="w-full border-b-2 border-gray  flex  gap-2 mt-5 justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-bold px-2">{player.rank}.</span>
                  <p className="text-sm font-bold">{player.fullName ?? player.displayName}</p>
                </div>
                <div className=" bg-gray w-[30px] h-6 text-slate-700 rounded-md text-center">
                  <p className=" ">{player.points ?? 0}</p>
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
                  <p className=" ">{player.basketballAssists ?? 0}</p>
                </div>
              </div>
            );
          })}
        <h3 className=" px-2 font-semibold text-lg mt-5">Rebounds</h3>
        {Array.from(stats.rebounds)
          ?.slice(0, 5)
          ?.map((player, i) => {
            return (
              <div key={i} className="w-full border-b-2 border-gray  flex  gap-2 mt-5 justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-bold px-2">{player.rank}.</span>
                  <p className="text-sm font-bold">{player.fullName ?? player.displayName}</p>
                </div>
                <div className=" bg-gray w-[30px] h-6 text-slate-700 rounded-md text-center">
                  <p className=" ">{player.rebounds ?? 0}</p>
                </div>
              </div>
            );
          })}
      </div>
    </MainLayout>
  );
};

export default StatsIndex;
