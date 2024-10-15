'use client';
import Link from 'next/link';
import GamingLayout from '../../../layouts/GamingLayout';
import { competitions } from '../../../utils/data/other';
import { useApp } from '@/contexts/AppProvider';
import GameMatchCard from '@/components/GameMatchCard';
const GamingPage = () => {
  const gamingCOmps = competitions.filter((comp) => !comp.hideInGaming);
  const { matches } = useApp();
  const predictableMatches = matches?.filter(
    (match) => match?.status?.status === 'NS' || match?.status?.status === 'TBD',
  );

  return (
    <GamingLayout>
      <main className="flex w-full flex-1 flex-col p-2 gap-y-3 overflow-x-hidden">
        <h1 className="text-center font-bold ">Welcome to the official RCA-ICC prediction !!</h1>
        <span className=" font-bold text-blue text-center">
          Predict on all available matches below to avoid being caught by deadline
        </span>
        {predictableMatches && predictableMatches?.length > 0 && (
          <div className="flex flex-col border2 gap-2 rounded-md p-2">
            <h1 className="text-lg font-semibold">UpComing matches</h1>
            <div className="grid w-full mt-4 desktop:grid-cols-3 five:grid-cols-2 gap-2">
              {predictableMatches?.map((match) => <GameMatchCard key={match._id} {...match} />)}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2 rounded-md p-2">
          <h1 className="text-lg font-semibold">Categories</h1>
          <div className="flex flex-wrap gap-4">
            {gamingCOmps.map((comp) => (
              <Link
                href={`/gaming/${comp.name}`}
                key={comp.id}
                className=" border-2 hover:bg-divBack rounded-lg items-center w-full max-w-[250px] gap-3 border-gray flex flex-col gap-y-3 p-3"
              >
                {comp.icon}
                <h1 className="font-semibold capitalize">{comp.name}</h1>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </GamingLayout>
  );
};

export default GamingPage;
