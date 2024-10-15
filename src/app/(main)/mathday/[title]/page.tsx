'use client';
import { useSanity } from '@/contexts/SanityProvider';
import { useParams } from 'next/navigation';
import React from 'react';
import MatchCard from '../../../../components/MatchCard';
import MainLayout from '../../../../layouts/MainLayout';
import { fetchMatchDayTitleQuery } from '../../../../lib/query1';
import { MatchDayType } from '../../../../utils/types/types2';

const Matchday = () => {
  const { client } = useSanity();
  const [matchday, setMatchday] = React.useState<MatchDayType | null>(null);
  const params = useParams<{ title: string }>();
  const title = params?.title;

  const getMatchday = async () => {
    try {
      const matchday = await client?.fetch(fetchMatchDayTitleQuery(title as string));
      // console.log(title, matchday);

      setMatchday(matchday[0]);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (title) getMatchday();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);
  return (
    <MainLayout isGeneral title={(title ?? 'Matchdays') as string}>
      <div className={`flex px-2 flex-col  w-full `}>
        <h1 className=" capitalize text-lg font=semibold">{title}</h1>
        <div className="flex w-full mt-4 flex-wrap gap-2">
          {matchday?.matches?.map((match) => <MatchCard key={match._id} {...match} />)}
          {matchday?.matches?.length === 0 && <h1 className="">No Matches Available</h1>}
          {(matchday === null || matchday === undefined) && <h1 className="">No Matches Available</h1>}
        </div>
      </div>
    </MainLayout>
  );
};

export default Matchday;
