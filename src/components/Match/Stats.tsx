import Image from 'next/image';
import { Match } from '../../utils/types/types1';

type Props = {
  match: Match;
};

const Stats = ({ match }: Props) => {
  const { stats, homeTeam, awayTeam, category } = match;
  if (!stats) return <div className=" text-center">No Stats Available</div>;

  const isVolleyball = category === 'volleyball';
  // const isBasketball = category === 'basketball';
  const isFootball = category === 'football';

  return (
    <div className="p-5 flex flex-col">
      <div className="flex items-center justify-between">
        <Image height={40} width={40} className="w-[30px]" src={homeTeam.logo ?? '/images/teamImage.svg'} alt="" />
        <p>TEAM STATS</p>
        <Image height={40} width={40} className="w-[30px]" src={awayTeam.logo ?? '/images/teamImage2.svg'} alt="" />
      </div>
      <RowStat
        left={stats.homeTeamStats.goals}
        right={stats.awayTeamStats.goals}
        stat={isFootball ? 'Goals' : isVolleyball ? 'Sets' : 'Points'}
      />
      {isFootball && (
        <>
          <RowStat left={stats.homeTeamStats.possession} right={stats.awayTeamStats.possession} stat="Possession" />
          <RowStat left={stats.homeTeamStats.shots} right={stats.awayTeamStats.shots} stat="Shots" />
          <RowStat
            left={stats.homeTeamStats.shotsOnTarget}
            right={stats.awayTeamStats.shotsOnTarget}
            stat="Shots On target"
          />
          <RowStat left={stats.homeTeamStats.fouls} right={stats.awayTeamStats.fouls} stat="Fouls" />
          <RowStat left={stats.homeTeamStats.corners} right={stats.awayTeamStats.corners} stat="Corners" />
          <RowStat left={stats.homeTeamStats.yellowCards} right={stats.awayTeamStats.yellowCards} stat="Yellow Cards" />
          <RowStat left={stats.homeTeamStats.redCards} right={stats.awayTeamStats.redCards} stat="Red Cards" />
          <RowStat left={stats.homeTeamStats.offsides} right={stats.awayTeamStats.offsides} stat="Offsides" />
        </>
      )}
    </div>
  );
};

export default Stats;

const RowStat = ({ left, stat, right }: any) => {
  if (left === null || right === null) return null;

  let l = left;
  let r = right;
  if (stat === 'possession') {
    l = `${left}%`;
    r = `${right}%`;
  }
  return (
    <div className="w-full mt-4 flex items-center justify-between">
      <p>{l}</p>
      <p className=" capitalize text-center">{stat}</p>
      <p>{r}</p>
    </div>
  );
};
