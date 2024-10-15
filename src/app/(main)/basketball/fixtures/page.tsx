'use client';
import { usePathname } from 'next/navigation';
import MatchCard from '@/components/MatchCard';
import { useApp } from '@/contexts/AppProvider';
import MainLayout from '@/layouts/MainLayout';
import { capitalize } from '@/utils/funcs';

const Fixtures = () => {
  const { matches } = useApp();
  const unfinishedMatches = matches?.filter(
    (match) => match.status?.status !== 'FT' && match.category === 'basketball',
  );

  const pathname = usePathname();
  const title = capitalize(pathname?.split('/')[2] ?? '') + ' - ' + capitalize(pathname?.split('/')[1] ?? '');
  return (
    <MainLayout title={title}>
      <div className="flex flex-col w-full px-3">
        <h1 className="my-2 font-semibold">UpComing Games</h1>
        <div className="grid w-full mt-4 desktop:grid-cols-3 five:grid-cols-2 gap-2">
          {unfinishedMatches?.map((match) => <MatchCard key={match._id} {...match} />)}
          {unfinishedMatches?.length === 0 && <h1 className="">No Matches Available</h1>}
        </div>
      </div>
    </MainLayout>
  );
};

export default Fixtures;
