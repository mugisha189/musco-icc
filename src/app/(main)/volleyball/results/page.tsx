'use client';
import React from 'react';
import MatchCard from '@/components/MatchCard';
import { useApp } from '@/contexts/AppProvider';
import MainLayout from '@/layouts/MainLayout';

const ResultsIndex = () => {
  const { matches } = useApp();
  const finishedMatches = matches?.filter(
    (match) => match?.status?.status === 'FT' && match?.category === 'volleyball',
  );
  return (
    <MainLayout title="BasketBall">
      <div className="flex flex-col border-2 rounded-md p-2 border-gray">
        <h1 className="text-xl font-semibold">Latest Results</h1>
        <div className="grid w-full mt-4 desktop:grid-cols-3 five:grid-cols-2 gap-2">
          {finishedMatches?.map((match) => <MatchCard key={match._id} {...match} />)}
          {finishedMatches?.length === 0 && <h1 className="">No Matches Available or No finished matches</h1>}
        </div>
      </div>
    </MainLayout>
  );
};

export default ResultsIndex;
