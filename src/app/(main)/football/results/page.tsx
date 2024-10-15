'use client';
import MainLayout from '@/layouts/MainLayout';
import MatchCard from '@/components/MatchCard';
import { useApp } from '@/contexts/AppProvider';
import { capitalize } from '@/utils/funcs';
import { usePathname } from 'next/navigation';

const ResultsIndex = () => {
  const { matches } = useApp();
  const finishedMatches = matches
    ?.filter(
      (match) => (match?.status?.status === 'FT' || match?.status?.status === 'FF') && match?.category === 'football',
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const pathname = usePathname();
  const title = capitalize(pathname?.split('/')[2] ?? '') + ' - ' + capitalize(pathname?.split('/')[1] ?? '');
  return (
    <MainLayout title={title}>
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
