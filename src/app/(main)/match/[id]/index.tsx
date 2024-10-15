'use client';
import LineUps from '@/components/Match/LineUps';
import Stats from '@/components/Match/Stats';
import Timeline from '@/components/Match/Timeline';
import { useApp } from '@/contexts/AppProvider';
import { useSanity } from '@/contexts/SanityProvider';
import MainLayout from '@/layouts/MainLayout';
import { MatchGoals, SEO } from '@/utils/types/misc';
import { Match } from '@/utils/types/types1';
import { RefType } from '@/utils/types/types2';
import { Tabs } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useState } from 'react';
import Moment from 'react-moment';

interface Props {
  match: Match;
}

const MatchIndex = ({ match }: Props) => {
  const { client } = useSanity();
  const [goals, setGoals] = useState<MatchGoals>({ away: [], home: [] });
  const { players, getPlayers } = useApp();

  const today = new Date();
  const dateMatch = new Date(match?.date ?? '');
  const isToday =
    dateMatch.getDate() === today.getDate() &&
    dateMatch.getMonth() === today.getMonth() &&
    dateMatch.getFullYear() === today.getFullYear();

  const hasStarted = match?.status?.status !== 'NS';

  const isBasketball = match?.category === 'basketball';

  const awayScore = isBasketball ? match?.stats?.awayTeamStats?.points : match?.stats?.awayTeamStats?.goals;
  const homeScore = isBasketball ? match?.stats?.homeTeamStats?.points : match?.stats?.homeTeamStats?.goals;

  useEffect(() => {
    if (!client) return;
    if (!players || players?.football.length === 0) {
      getPlayers!(client);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  useLayoutEffect(() => {
    const goalEvents = match?.events?.filter((event) => event.type === 'goal');
    const homeGoals: MatchGoals['home'] = [];
    const awayGoals: MatchGoals['away'] = [];
    if (players && players?.football.length > 0) {
      goalEvents?.forEach((event: any) => {
        const player = players?.football.find((player) => player._id === event.scorer?._ref);

        if (event.team === 'home') {
          console.log(event?.scorer?._ref);
          homeGoals.push({ ...event, scorer: player });
        } else {
          awayGoals.push({ ...event, scorer: player });
        }
      });
    }

    setGoals({ home: homeGoals, away: awayGoals });
  }, [match?.events, players]);

  const seo: SEO = {
    title: `${match?.homeTeam?.name} vs ${match?.awayTeam?.name}`,
    description: `${match?.description}`,
    image: match?.banner,
  };

  const mergedPlayers = match?.awayTeam.players.concat(match?.homeTeam.players);

  const manOfTheMatch = mergedPlayers?.find((player) => player._id == (match?.fantasy?.manOfTheMatch as RefType)?._ref);
  const highestScorer = mergedPlayers?.find(
    (player) => player._id == (match?.fantasy?.highestScoringPlayer as RefType)?._ref,
  );
  const firstTeamToScore = [match?.homeTeam, match?.awayTeam].find(
    (team) => team._id === (match?.fantasy?.firstTeamToScore as RefType)?._ref,
  );

  // const isLive = match?.status?.status === 'LIVE';

  if (!match) return null;

  return (
    <MainLayout isGeneral title={seo.title} seo={seo}>
      <div className={`flex px-2 flex-col tablet:w-4/5 max-w-[1000px] w-full shadow-md mx-auto`}>
        <div className="flex px-3 items-center justify-between w-full">
          <p className="text-violet-1000">
            <span className=" cursor-pointer capitalize">{match?.category}</span>
            <span className={`ml-2 text-orange`}>
              {isToday ? 'Today' : <Moment format="DD MMM">{match?.date}</Moment>}
            </span>
          </p>
          {<p className=" text-orange">{match?.status?.status}</p>}
        </div>
        <div className="flex px-4 py-4 max-w-[800px] w-full justify-between mx-auto mt-4">
          <div className="flex gap-3 align-middle text-center flex-col">
            <Link href={`/team/${match?.homeTeam._id}`} className="flex five:flex-row flex-col items-center gap-2">
              <Image src={match?.homeTeam.logo ?? '/images/teamImage.svg'} alt="team1" width={100} height={100} />
              <p className="text-md text-slate-700 text-xl font-semibold">{match?.homeTeam.name}</p>
            </Link>
            {hasStarted && !isBasketball && (
              <div className="flex flex-col gap-y-1">
                {goals.home.map((goal, i) => (
                  <div key={i} className=" gap-x-2">
                    <span className="text-md font-bold text-sm">{goal.time}'</span>
                    <span className="text-slate p-2 text-sm">{goal?.scorer?.displayName ?? 'Unknown'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-3 items-center">
            {hasStarted ? (
              <>
                <div className="flex items-center gap-x-4">
                  <span className="text-center align-middle text-2xl">{homeScore}</span>
                  <span className=" text-sm text-slate-500 ">-</span>
                  <span className="text-center align-middle text-2xl">{awayScore}</span>
                </div>
                <span className="">FT</span>
              </>
            ) : (
              <span className=" text-sm text-slate-500 my-auto ">VS</span>
            )}
          </div>
          <div className="flex gap-3 align-middle text-center flex-col">
            <Link
              href={`/team/${match?.awayTeam._id}`}
              className="flex five:flex-row flex-col-reverse items-center gap-2"
            >
              <p className="text-md text-slate-700 text-xl font-semibold">{match?.awayTeam.name}</p>
              <Image src={match?.awayTeam.logo ?? '/images/teamImage2.svg'} alt="team1" width={100} height={100} />
            </Link>
            {hasStarted && !isBasketball && (
              <div className="flex flex-col gap-y-1">
                {goals.away.map((goal, i) => (
                  <div key={i} className=" gap-x-2">
                    <span className="text-slate p-2 text-sm">{goal.scorer?.displayName ?? 'Own Goal'}</span>
                    <span className="text-md font-bold text-sm">{goal.time}'</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <Tabs color="#ff7b35" defaultValue={'stats'} keepMounted={false}>
          <Tabs.List grow>
            <Tabs.Tab value="timeline">
              <span className=" text-base">Timeline</span>
            </Tabs.Tab>
            <Tabs.Tab value="lineups">
              <span className=" text-base">Lineups</span>
            </Tabs.Tab>
            <Tabs.Tab value="stats">
              <span className=" text-base"> Stats</span>
            </Tabs.Tab>
            <Tabs.Tab value="fantasy">
              <span className=" text-base">Fantasy</span>
            </Tabs.Tab>
          </Tabs.List>
          {hasStarted ? (
            <>
              <Tabs.Panel value="stats">
                <Stats match={match} />
              </Tabs.Panel>
              <Tabs.Panel value="lineups">
                <LineUps
                  lineups={[match?.homeTeamLineup, match?.awayTeamLineup]}
                  homeTeam={match?.homeTeam}
                  awayTeam={match?.awayTeam}
                  isBasketball={isBasketball}
                />
              </Tabs.Panel>
              <Tabs.Panel value="timeline">
                <Timeline timeline={match?.events} isBasketball={isBasketball} />
              </Tabs.Panel>
              <Tabs.Panel value="fantasy">
                <div className="flex flex-col w-full py-3 text-center">
                  <h1 className="font-bold mt-4"> Man of The Match</h1>
                  {manOfTheMatch ? (
                    <p className="">{manOfTheMatch?.fullName}</p>
                  ) : (
                    <p>Man of the match not yet appointed</p>
                  )}
                  <h1 className="font-bold  mt-4">Highest Scorer</h1>
                  {highestScorer ? <p>{highestScorer?.fullName}</p> : <p>Highest scorer not yet determined</p>}
                  <h1 className="font-bold  mt-4">First team to score</h1>
                  {firstTeamToScore ? <p>{firstTeamToScore?.name}</p> : <p>First team to score not yet determined</p>}
                </div>
              </Tabs.Panel>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px]">
              <p className="text-xl text-slate-700 opacity-75">Match not started yet</p>
            </div>
          )}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default MatchIndex;
