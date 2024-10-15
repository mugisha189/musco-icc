'use client';
import GameMatchCard from '@/components/GameMatchCard';
import { useApp } from '@/contexts/AppProvider';
import GamingLayout from '@/layouts/GamingLayout';
import { Match } from '@/utils/types/types1';
import React, { useEffect } from 'react';

const GamingPage = () => {
  const { matches, userPredictions } = useApp();
  const [predictedMatches, setPredictedMatches] = React.useState<Match[]>([]);

  useEffect(() => {
    const predictedMatches = matches?.filter((match) => {
      const userPrediction = userPredictions?.find((prediction) => prediction.matchId === match._id);
      return userPrediction;
    });
    if (predictedMatches === undefined) return;
    setPredictedMatches(predictedMatches);
  }, [matches, userPredictions]);

  return (
    <GamingLayout title="My Predictions" isGeneral>
      <div className="">
        <div className="grid w-full mt-4 desktop:grid-cols-3 five:grid-cols-2 gap-2">
          {predictedMatches?.map((match) => <GameMatchCard key={match._id} {...match} />)}
        </div>
        {predictedMatches?.length == 0 && (
          <h1 className="font-bold text-center align-middle">There's no matches predicted on yet </h1>
        )}
      </div>
    </GamingLayout>
  );
};

export default GamingPage;
