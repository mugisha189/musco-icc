'use client';
import GameMatchCard from '@/components/GameMatchCard';
import { useApp } from '@/contexts/AppProvider';
import GamingLayout from '@/layouts/GamingLayout';
const GamingPage = () => {
  const { matches } = useApp();
  const footballMatchNS = matches?.filter((match) => match?.status.status === 'NS' && match?.category === 'football');

  return (
    <GamingLayout>
      <div className="">
        {footballMatchNS?.map((match) => <GameMatchCard key={match._id} {...match} />)}
        {footballMatchNS?.length == 0 && (
          <h1 className="font-bold text-center align-middle">There's no matches to predict for football</h1>
        )}
      </div>
    </GamingLayout>
  );
};

export default GamingPage;
