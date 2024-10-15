'use client';
import React from 'react';
import MatchCard from '../../../../components/MatchCard';
import { useApp } from '../../../../contexts/AppProvider';
import MainLayout from '../../../../layouts/MainLayout';

const ResultsIndex = () => {
  const { matches } = useApp();
  const finishedMatches = matches
    ?.filter((match) => match?.status?.status === 'FT' && match?.category === 'basketball')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <MainLayout title="BasketBall - Results">
      <div className="flex flex-col border-2 rounded-md p-2 border-gray">
        <h1 className="text-xl font-semibold">Latest Results</h1>
        <div className="grid w-full mt-4 desktop:grid-cols-3 five:grid-cols-2 gap-2">
          {finishedMatches?.map((match) => <MatchCard key={match._id} {...match} />)}
        </div>
      </div>
    </MainLayout>
  );
};

export default ResultsIndex;