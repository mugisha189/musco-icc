'use client';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '../../contexts/AppProvider';
import { competitions } from '../../utils/data/other';

const MatchCard = dynamic(() => import('@/components/MatchCard'));
const Countdown = dynamic(() => import('@/components/shared/Countdown'));
const MainLayout = dynamic(() => import('@/layouts/MainLayout'));

const Home: NextPage = () => {
  const { matches, trends, friendlyMatches } = useApp();
  // const [isFinished, setIsFinished] = useState(true);

  const finishedMatches = matches
    ?.filter((match) => match?.status?.status === 'FT' || match?.status?.status === 'FF')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  const unfinishedMatches = matches?.filter(
    (match) => match?.status?.status !== 'FT' && match?.status?.status !== 'FF',
  );
  const upComingMatches = unfinishedMatches?.slice(0, 5);
  const todayMatch = unfinishedMatches?.filter((match) => new Date(match.date).getDate() === new Date().getDate())[0];
  const mainTrend = trends?.slice(0, 1)[0];

  // useEffect
  // make a data of 25th March 2023 16:30 into readable javascript date
  const date = new Date(todayMatch?.date!);
  // make a date which is greater tha today's match by 3 hours
  const finishDate = new Date(date.getTime() + 1000 * 60 * 60 * 2);
  console.log('date', finishDate.toString());
  const isFinished = new Date().getTime() > finishDate.getTime();
  console.log('isFinished', isFinished);

  return (
    <>
      <MainLayout title="ICC - Home" isGeneral>
        <main className="flex w-full flex-1 flex-col p-2 gap-y-3 overflow-x-hidden">
          {!isFinished && todayMatch && todayMatch.status.status === 'NS' && (
            <div className="flex flex-col border-2 rounded-md p-2 border-gray gap-y-3">
              <h1 className="text-xl font-semibold">Today&apos;s main match</h1>
              <Countdown
                match={todayMatch}
                isFinished={isFinished}
                targetDate={date}
                endTime={finishDate}
                startTime={date}
              />
            </div>
          )}
          {trends && trends?.length > 0 && (
            <div className="flex flex-col border-2 rounded-md p-2 border-gray gap-y-3">
              <h1 className="text-xl font-semibold">Trending</h1>
              <div key={mainTrend?._id} className="flex flex-col gap-y-3 w-full">
                <h1 className="text-lg font-semibold">{mainTrend?.title}</h1>
                <div className="flex md:flex-row flex-col w-full gap-3">
                  <Image
                    className=" w-full object-cover md:w-1/2 aspect-video"
                    src={mainTrend?.image!}
                    alt={mainTrend?.title!}
                    width={1920}
                    height={1080}
                  />
                  <div className="flex flex-col md:w-1/2 w-full">
                    <p className="">{mainTrend?.description.slice(0, 200) + '...'}</p>
                    <Link
                      href={`/trends/${mainTrend?._id}`}
                      className="w-fit mt-4 px-3 py-2 text-blue flex items-center hover:text-[#1a44da] duration-300 rounded-md"
                    >
                      Read More<span className="ml-2 mt-1">{'>>'}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          {friendlyMatches && friendlyMatches?.length > 0 && (
            <div className="flex flex-col border-2 gap-2 rounded-md p-2 border-gray">
              <h1 className="text-lg font-semibold">Friendlies</h1>
              <div className="grid w-full mt-4 desktop:grid-cols-3 five:grid-cols-2 gap-2">
                {friendlyMatches?.map((match) => <MatchCard key={match._id} {...match} />)}
              </div>
            </div>
          )}
          {finishedMatches && finishedMatches?.length > 0 && (
            <div className="flex flex-col border-2 rounded-md p-2 border-gray">
              <h1 className="text-xl font-semibold">Latest Results</h1>
              <div className="grid w-full mt-4 desktop:grid-cols-3 five:grid-cols-2 gap-2">
                {finishedMatches?.map((match) => <MatchCard key={match._id} {...match} />)}
              </div>
            </div>
          )}
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
          <div className="flex flex-col border-2 rounded-md p-2 border-gray">
            <h1 className="text-xl font-semibold">Competitions</h1>
            <div className="flex w-full mt-4 flex-wrap gap-3">
              {competitions.map((comp) => (
                <Link
                  href={comp.url ?? `/${comp.name}`}
                  key={comp.id}
                  className=" border-2 hover:bg-divBack items-center w-full max-w-[250px] gap-3 border-gray flex flex-col gap-y-3 p-3"
                >
                  {comp.icon}
                  <h1 className="font-semibold capitalize">{comp.name}</h1>
                </Link>
              ))}
            </div>
            {/* <Link
						href={"/football/fixtures"}
						className='w-fit mt-4 px-3 py-2 text-blue flex items-center hover:text-[#1a44da] duration-300 rounded-md'
					>
						See All Fixtures<span className='ml-2 mt-1'>{">>"}</span>
					</Link> */}
          </div>
        </main>
      </MainLayout>
    </>
  );
};

export default Home;
