'use client';
import GenderSwitcher from '@/components/shared/GenderSwitcher';
import { useSanity } from '@/contexts/SanityProvider';
import useGender from '@/hooks/useGender';
import { useEffect } from 'react';
import { useApp } from '@/contexts/AppProvider';
import MainLayout from '@/layouts/MainLayout';
import { mixArray } from '@/utils/funcs';

const StatsIndex = () => {
  const { client } = useSanity();
  const { players, getPlayers } = useApp();

  const [volleyPlayers, setVolleyPlayers] = useGender(mixArray(players?.volleyball!));
  const withMostPoints = volleyPlayers?.sort((a, b) => (b?.points ?? 0) - (a?.points ?? 0));
  //  const withMostAssists = volleyPlayers?.sort(
  // 		(a, b) => ((b.volleyballAssists ?? 0) - (a.volleyballAssists ?? 0)) as any
  //  );

  useEffect(() => {
    if (!players || (players.volleyball.length === 0 && players.football.length === 0)) {
      getPlayers!(client);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  return (
    <MainLayout title="Volleyball - Stats">
      <div className="p-3 flex flex-col w-full gap-y-2">
        <GenderSwitcher onChange={setVolleyPlayers} className=" max-w-md mx-auto w-full" />
        <h3 className=" px-2 font-semibold text-lg mt-5">Points</h3>
        {withMostPoints?.slice(0, 5)?.map((player, i) => {
          return (
            <div key={i} className="w-full border-b-2 border-gray  flex  gap-2 mt-5 justify-between">
              <div className="flex items-center">
                <span className="text-sm font-bold px-2">{i + 1}.</span>
                <p className="text-sm font-bold">{player.fullName ?? player.displayName}</p>
              </div>
              <div className=" bg-gray w-[30px] h-6 text-slate-700 rounded-md text-center">
                <p className=" ">{player.goals ?? 0}</p>
              </div>
            </div>
          );
        })}
        {/* <h3 className=' px-2 font-semibold text-lg mt-5'>Assists</h3>
				{withMostAssits?.slice(0, 5)?.map((player, i) => {
					return (
						<div
							key={i}
							className='w-full border-b-2 border-gray  flex  gap-2 mt-5 justify-between'
						>
							<div className='flex items-center'>
								<span className='text-sm font-bold px-2'>{i + 1}.</span>
								<p className='text-sm font-bold'>{player.fullName}</p>
							</div>
							<div className=' bg-gray w-[30px] h-6 text-slate-700 rounded-md text-center'>
								<p className=' '>{player.footballAssists ?? 0}</p>
							</div>
						</div>
					);
				})} */}
      </div>
    </MainLayout>
  );
};

export default StatsIndex;
