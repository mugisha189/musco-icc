'use client';
import Link from 'next/link';
import MatchCard from '@/components/MatchCard';
import Table from '@/components/constants/Table';
import { useApp } from '@/contexts/AppProvider';
import MainLayout from '@/layouts/MainLayout';
import useGender from '@/hooks/useGender';
import GenderSwitcher from '@/components/shared/GenderSwitcher';

const IndexFootball = () => {
  const { teams, matches } = useApp();
  const [genderTeams, setGenderTeams] = useGender(teams?.football!);

  const unfinishedMatches = matches?.filter(
    (match) => match?.status?.status !== 'FT' && match?.status?.status !== 'FF' && match.category === 'football',
  );
  const finishedMatches = matches
    ?.filter(
      (match) => (match?.status?.status === 'FT' || match?.status?.status === 'FF') && match.category === 'football',
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  const upComingMatches = unfinishedMatches?.slice(0, 5);
  return (
    <MainLayout title="Football">
      <div className="flex flex-col w-full gap-y-3">
        {/* <div className='flex w-full flex-col mx-auto max-w-[800px]'>
				<LiveGameCard path='/match/23' />
			</div> */}
        <div className="flex flex-col border-2 rounded-md p-2 border-gray">
          <div className="p-3 gap-y-3 flex flex-col">
            <GenderSwitcher onChange={setGenderTeams} className=" max-w-md mx-auto w-full" />
            <div className="float-left font-bold text-lg px-3">
              <h3>Football Standings</h3>
            </div>
            <Table teams={genderTeams} />
          </div>
        </div>
        <div className="flex flex-col border-2 rounded-md p-2 border-gray">
          <h1 className="text-xl font-semibold">Latest Results</h1>
          <div className="grid w-full mt-4 desktop:grid-cols-3 five:grid-cols-2 gap-2">
            {finishedMatches?.map((match) => <MatchCard key={match._id} {...match} />)}
          </div>
          <Link
            href={'/football/fixtures'}
            className="w-fit mt-4 px-3 py-2 text-blue flex items-center hover:text-[#1a44da] duration-300 rounded-md"
          >
            See All Fixtures<span className="ml-2 mt-1">{'>>'}</span>
          </Link>
        </div>
        <div className="flex flex-col border-2 rounded-md p-2 border-gray">
          <h1 className="text-xl font-semibold">Upcoming Matches</h1>
          <div className="grid w-full mt-4 desktop:grid-cols-3 five:grid-cols-2 gap-2">
            {upComingMatches?.map((match) => <MatchCard key={match._id} {...match} />)}
          </div>
          <Link
            href={'/football/fixtures'}
            className="w-fit mt-4 px-3 py-2 text-blue flex items-center hover:text-[#1a44da] duration-300 rounded-md"
          >
            See All Fixtures<span className="ml-2 mt-1">{'>>'}</span>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default IndexFootball;